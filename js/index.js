const OPTIONS = [{location: "Beach", roles: ["Beach Waitress", "Kite Surfer", "Lifeguard", "Thief", "Beach Photographer", "Ice Cream Trucker Driver", "Beach Goer"]},
                 {location: "Broadway Theater", roles: ["Coat Check Manager", "Prompter", "Cashier", "Director", "Actor", "Backstage Crew", "Audience Member"]},
                 {location: "Casino", roles: ["Bartender", "Head Security Guard", "Bouncer", "Manager", "Hustler", "Dealer", "Gambler"]},
                 {location: "Circus Tent", roles: ["Acrobat", "Animal Trainer", "Magician", "Fire Eater", "Clown", "Juggler", "Visitor"]},
                 {location: "Corporate Party", roles: ["Entertainer", "Manager", "Unwanted Guest", "Owner", "Secretary", "Delivery Boy", "Accountant"]},
                 {location: "Race Track", roles: ["Team Owner", "Driver", "Engineer", "Spectator", "Referee", "Mechanic", "Food Vendor", "Commentator", "Bookmaker"]},
                 {location: "Art Museum", roles: ["Ticket Seller", "Student", "Visitor", "Teacher", "Security Guard", "Painter", "Art Collector", "Art Critic", "Photographer", "Tourist"]},
                 {location: "Baseball Stadium", roles: ["Pitcher", "Catcher", "Commenter", "Spectator", "Security Guard", "Umpire", "Food Vendor", "Manager", "First Baseman", "Shortstop", "Outfielder", "Second Baseman", "Third Baseman", "Mascot", "Team Owner"]},
                 {location: "Cat Show", roles: ["Judge", "Cat-Handler", "Veterinarian", "Security Guard", "Cat Trainer", "Crazy Cat Lady", "Animal Lover", "Cat Owner", "Cat"]},
                 {location: "Bank", roles: ["Armored Car Driver", "Manager", "Consultant", "Robber", "Security Guard", "Teller", "Customer"]},
                 {location: "Hotel", roles: ["Doorman", "Security Guard", "Manager", "Housekeeper", "Bartender", "Bellman", "Customer"]},
                 {location: "Restaurant", roles: ["Musician", "Bouncer", "Hostess", "Head Chef", "Food Critic", "Waiter", "Customer"]},
                 {location: "Service Station", roles: ["Manager", "Tire Specialist", "Biker", "Car Owner", "Car Wash Operator", "Electrician", "Auto Mechanic"]},
                 {location: "Vineyard", roles: ["Gardener", "Gourmet Guide", "Winemaker", "Exporter", "Butler", "Wine Taster", "Sommelier", "Owner", "Vineyard Manager"]},
                 {location: "Construction Site", roles: ["Free-Roaming Toddler", "Contractor", "Crane Driver", "Trespasser", "Safety Officer", "Electrician", "Engineer", "Architect", "Construction Worker"]},
                 {location: "Candy Factory", roles: ["Candy Maker", "Pastry Chef", "Visitor", "Taster", "Truffle Maker", "Supply Worker", "Packager", "Inspector", "Machine Operator"]},
                 {location: "Hospital", roles: ["Nurse", "Doctor", "Anesthesiologist", "Intern", "Therapist", "Surgeon", "Patient"]},
                 {location: "Military Base", roles: ["Deserter", "Colonel", "Medic", "Sniper", "Officer", "Tank Engineer", "Soldier"]},
                 {location: "Police Station", roles: ["Detective", "Lawyer", "Journalist", "Criminalist", "Archivist", "Criminal", "Patrol Officer"]},
                 {location: "Library", roles: ["Old Man", "Journalist", "Author", "Volunteer", "Know-It-All", "Student", "Librarian", "Loudmouth", "Book Fanatic", "Nerd"]},
                 {location: "Jail", roles: ["Wrongly Accused Man", "CCTV Operator", "Guard", "Visitor", "Lawyer", "Janitor", "Jailkeeper", "Criminal", "Correction Officer", "Maniac"]},
                 {location: "United Nations", roles: ["Diplomat", "Interpreter", "Blowhard", "Tourist", "Napping Delegate", "Journalist", "Secretary of State", "Speaker", "Secretary General", "Lobbyist"]},
                 {location: "Airplane", roles: ["First Class Passenger", "Air Marshal", "Mechanic", "Flight Attendant", "Co-Pilot", "Captain", "Economy Class Passenger"]},
                 {location: "Passenger Train", roles: ["Mechanic", "Border Patrol", "Train Attendant", "Restaurant Chef", "Train Driver", "Stoker", "Passenger"]},
                 {location: "Submarine", roles: ["Cook", "Commander", "Sonar Technician", "Eloctronics Technician", "Radioman", "Navigator", "Sailor"]},
                 {location: "Pirate Ship", roles: ["Cook", "Slave", "Cannoneer", "Tied Up Prisoner", "Cabin Boy", "Brave Captain", "Sailor"]},
                 {location: "Cathedral", roles: ["Priest", "Beggar", "Sinner", "Tourist", "Sponsor", "Chorister", "Parishioner"]},
                 {location: "Crusader Army", roles: ["Monk", "Imprision Saracen (Roman-era Arab/Muslim)", "Servant", "Bishop", "Squire", "Archer", "Knight"]},
                 {location: "Cemetary", roles: ["Priest", "Grave Robber", "Poet", "Mourner", "Gatekeeper", "Dead Person", "Relative", "Flower Seller", "Grave Digger", "Goth Girl/Boy"]},
                 {location: "Polar Station", roles: ["Medic", "Expedition Leader", "Biologist", "Radioman", "Hydrologist", "Meteorologist", "Geologist"]},
                 {location: "Space Station", roles: ["Engineer", "Alien", "Pilot", "Commander", "Scientist", "Doctor", "Space Tourist"]},
                 {location: "Wolrd War II Squadron", roles: ["Resistance Fighter", "Radioman", "Scout", "Medic", "Cook", "Imprisoned Nazi", "Soldier"]},
                 {location: "Retirement Home", roles: ["Relative", "Cribbage Player", "Old Person", "Nurse", "Janitor", "Cook", "Blind Soul", "Psychologist"]},
                 {location: "Subway", roles: ["Tourist", "Subway Operator", "Ticket Inspector", "Pregnant Lady", "Pickpocket", "Cleaner", "Businessman", "Ticket Seller", "Old Lady", "Blind Man", "Performer"]},
                 {location: "Coal Mine", roles: ["Safety Inspector", "Miner", "Overseet", "Dump Truck Operator", "Driller", "Coordinator", "Blasting Engineer", "Solid Waste Engineer", "Worker"]},
                 {location: "Rock Concert", roles: ["Guitarist", "Drummer", "Roadie", "Stage Diver", "Security Guard", "Bassist", "Sound Technician"]},
                 {location: "Jazz Club", roles: ["Bouncer", "Drummer", "Pianist", "Saxophonist", "Singer", "Jazz Fanatic", "Dancer", "Barman", "VIP", "Waiter"]},
                 {location: "Wedding", roles: ["Ring Bearer", "Groom", "Bride", "Officiant", "Photographer", "Flower Girl", "Father of the Bride", "Wedding Crasher", "Best Man", "Maid of Honor", "Relative"]},
                 {location: "Gas Station", roles: ["Car Enthusiast", "Service Attendant", "Shopkeeper", "Customer", "Car Washer", "Cashier", "Climate Change Activist", "Manager"]},
                 {location: "Harbor Docks", roles: ["Loader", "Salty Old Pirate", "Captain", "Sailor", "Fisherman", "Exporter", "Cargo Overseer", "Cargo Inspector", "Smuggler", "Old Man"]},
                 {location: "Sightseeing Bus", roles: ["Old Man", "Lone Tourist", "Driver", "Annoying Child", "Tourist", "Tour Guide", "Photographer", "Lost Person"]}]

const shuffle = (array, seed) => {
    array = array.slice();
    let currentIndex = array.length
    let temporaryValue;
    let randomIndex;
    seed = seed || 1;

    let random = () => {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
        // Pick a reboarding element
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
