extern crate ws;

use std::str;
use std::thread;
use std::sync::Arc;
use uuid::Uuid;
use serde::{Deserialize, Serialize};
use serde_json::{Value};
use sled::{Event, IVec, Db};

// TODO
// associate connection with user
// -- user record should be generated when Server is created
// -- User struct is assigned as the value
// chat struct requires a User
// rooms route


struct Server {
    ws: ws::Sender,
    db: Arc<Db>,
}

#[derive(Serialize, Deserialize)]
struct Message {
    route: String,
    event: String,
    body: Value,
}

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
}

#[derive(Serialize, Deserialize)]
struct Chat {
    // TODO bring back user
    message: String,
}

#[derive(Serialize, Deserialize)]
struct Chats {
    chats: Vec<String>,
}

fn all_users(db: Arc<Db>) -> Vec<User> {
    let scan = db.scan_prefix("user/");
    scan.map(
        |v|
        {
            let data = v.unwrap();
            // let k = IVec::from(data.0);
            // let key = &str::from_utf8(&k).unwrap();
            let v = IVec::from(data.1);
            let value: User = bincode::deserialize(&v).unwrap();
            // println!("k: {}, v: {}", key, value.name);
            value
        }
    ).collect()
}

impl ws::Handler for Server {
    fn on_open(&mut self, _shake: ws::Handshake) -> ws::Result<()> {
        // TODO turn each of these sections into its own fn

        // Send all users
        let users: Vec<User> = all_users(self.db.clone());
        let users_body = serde_json::to_value(&users).unwrap();
        let users_msg = Message {
            route: "/users".to_owned(),
            event: "info".to_owned(),
            body: users_body
        };
        let users_r = serde_json::to_string(&users_msg).unwrap();
        self.ws.send(users_r)?;

        // Send all chats
        let chats_encoded: Vec<u8> = self.db.get("chats").unwrap().unwrap_or(IVec::from(vec![])).to_vec(); // NOTE i needed some default. I can probably do this better.
        let chat_ids: Chats = match chats_encoded.len() {
            0 => Chats{chats: vec![]},
            _ => bincode::deserialize(&chats_encoded[..]).unwrap(),
        };
        let mut chats: Vec<Chat> = vec![];
        for id in chat_ids.chats {
            let chat_encoded: Vec<u8> = self.db.get(id.as_bytes()).unwrap().unwrap_or(IVec::from(vec![])).to_vec();
            if chat_encoded.len() > 0 {
                let chat: Chat = bincode::deserialize(&chat_encoded[..]).unwrap();
                chats.push(chat);
            }
        }
        let chats_body = serde_json::to_value(&chats).unwrap();
        let chats_msg = Message {
            route: "/chats".to_owned(),
            event: "info".to_owned(),
            body: chats_body,
        };
        let chats_r = serde_json::to_string(&chats_msg).unwrap();
        self.ws.send(chats_r)?;

        // Initialize users subscriber
        let db_users = self.db.clone();
        let ws_users = self.ws.clone();
        thread::spawn(move || {
            let events = db_users.watch_prefix("user/");
            for event in events {
                let msg = match event {
                    Event::Insert(_k, v) => {
                        let user: User = bincode::deserialize(&v).unwrap();
                        Message {
                            route: "/users".to_owned(),
                            event: "create".to_owned(),
                            body: serde_json::to_value(user).unwrap(),
                        }
                    },
                    Event::Remove(k) => {
                        let key = str::from_utf8(&k).unwrap().to_string();
                        let user = User { name: key };
                        Message {
                            route: "/users".to_owned(),
                            event: "delete".to_owned(),
                            body: serde_json::to_value(user).unwrap(),
                        }
                    }
                };

                let r = serde_json::to_string(&msg).unwrap();
                ws_users.send(r);
            }
        });

        // Subscribe to chat events
        let db_chat = self.db.clone();
        let ws_chat = self.ws.clone();
        thread::spawn(move || {
            let events = db_chat.watch_prefix("chat/");
            for event in events {
                match event {
                    Event::Insert(_k, v) => {
                        // No need to wrap in event because it is always a create.
                        let chat: Chat = bincode::deserialize(&v).unwrap();
                        let v = serde_json::to_value(&chat).unwrap();
                        let msg = Message {
                            route: "/chat".to_owned(),
                            event: "create".to_owned(),
                            body: v,
                        };
                        let r = serde_json::to_string(&msg).unwrap();
                        ws_chat.send(r);
                    },
                    Event::Remove(_k) => {} // No delete
                };
            }
        });

        Ok(())
    }

    fn on_message(&mut self, msg: ws::Message) -> ws::Result<()> {
        println!("Message: {}", msg);
        let m: Message = serde_json::from_str(&msg.to_string()).unwrap();
        let r = match m.route.as_str() {
            "/echo" => {
                "TODO handle echo route"
            },
            "/users" => {
                let user: User = serde_json::from_value(m.body).unwrap();
                let k = format!("user/{}", user.name);
                let v = bincode::serialize(&user).unwrap();
                self.db.insert(&k, v);

                "ok"
            },
            "/chat" => {
                let chat: Chat = serde_json::from_value(m.body).unwrap();

                // // Add chat
                let k = format!("chat/{}", Uuid::new_v4().to_hyphenated());
                let v = bincode::serialize(&chat).unwrap();
                self.db.insert(&k.as_bytes(), v);

                // Update chats list
                let chats_k = "chats";
                let chats_encoded: Vec<u8> = self.db.get(chats_k).unwrap().unwrap_or(IVec::from(vec![])).to_vec(); // NOTE I needed some default. I can probably do this better.
                let mut chats: Chats = match chats_encoded.len() {
                    0 => Chats{chats: vec![]},
                    _ => bincode::deserialize(&chats_encoded[..]).unwrap(), // TODO I think chats_encoded.as_str() would also work
                };
                chats.chats.insert(0, k.clone());
                let max_len = 100;
                let remove_ids: Vec<String> = match chats.chats.len() {
                    l if l > max_len => chats.chats.drain(max_len..).collect(), // truncate
                    _ => vec![],
                };
                let chats_v: Vec<u8> = bincode::serialize(&chats).unwrap();
                self.db.insert(&chats_k, chats_v);

                // Remove chat records no longer in chat list
                for chat_id in remove_ids {
                    self.db.remove(&chat_id);
                }

                "ok"
            },
            _ => {
                println!("Unknown route: {}", m.route);
                "unknown route"
            }
        };
        self.ws.send(r)
    }
}

fn main() {
    // let db = Arc::new(sled::open("game_db").expect("Sled must start ok."));
    let db = Arc::new(sled::Config::new().temporary(true).open().expect("Sled must start ok."));

    ws::listen("127.0.0.1:3012", |out| {
        Server {
            ws: out,
            db: db.clone(),
        }
    }).unwrap()
}
