(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){e.exports=a(240)},105:function(e,t,a){},110:function(e,t,a){},240:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(15),c=a.n(s),o=(a(105),a(20)),i=a.n(o),l=a(98),u=a(27),m=a(16),p=a(32),d=a(18),h=a(17),v=a(19),g=a(39),f=a(97),b=a.n(f),y=a(96),E=a.n(y),O=a(59),I=a.n(O),S=a(58),j=a.n(S),w=a(60),k=a.n(w),C=a(40),H=a.n(C),N=a(41),D=a.n(N),x=a(42),M=a.n(x),L=a(43),W=a.n(L),P=a(93),A=a.n(P),B=a(99),_=a(94),R=a.n(_),T=function(e){var t=new B.a;if(window.location.hash.length>1){var a=window.location.hash.slice(1),n=R.a.parse(a);n.access_token&&(t.set("spotify-access-token",n.access_token,{maxAge:3595}),window.location=window.location.href.split("#")[0])}var r=t.get("spotify-access-token");if(r)e.setAccessToken(r);else{var s=encodeURIComponent("user-read-playback-state user-modify-playback-state"),c=window.location.href,o="https://accounts.spotify.com/authorize?response_type=token&client_id=".concat("ff53948d58f1491baa6169d34bc4179a","&scope=").concat(s,"&redirect_uri=").concat(c);window.location=o}},z=(a(110),Object(g.createMuiTheme)({palette:{primary:{main:"#91ddfc"},secondary:{main:"#fcaf91"}},typography:{useNextVariants:!0}})),F=new A.a;T(F);var J=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={labelWidth:0},a.render=function(){var e={display:a.props.gameHasStarted?"none":"default"};return r.a.createElement(H.a,{className:"select-form-control",variant:"outlined",style:e},r.a.createElement(D.a,{ref:function(e){a.InputLabelRef=e},htmlFor:"game-length"},"Game Length"),r.a.createElement(M.a,{native:!0,value:a.props.value,onChange:a.props.onChange,className:"config-select",input:r.a.createElement(W.a,{labelWidth:a.state.labelWidth,name:"game-length",id:"game-length"})},r.a.createElement("option",{value:10},"10 minutes"),r.a.createElement("option",{value:20},"20 minutes"),r.a.createElement("option",{value:30},"30 minutes"),r.a.createElement("option",{value:40},"40 minutes"),r.a.createElement("option",{value:50},"50 minutes"),r.a.createElement("option",{value:60},"60 minutes"),r.a.createElement("option",{value:70},"70 minutes"),r.a.createElement("option",{value:80},"80 minutes"),r.a.createElement("option",{value:90},"90 minutes")))},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.setState({labelWidth:c.a.findDOMNode(this.InputLabelRef).offsetWidth})}}]),t}(r.a.Component),G=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={labelWidth:0},a.render=function(){return r.a.createElement(H.a,{className:"select-form-control",variant:"outlined"},r.a.createElement(D.a,{ref:function(e){a.InputLabelRef=e},htmlFor:"shot-interval"},"Shot Interval"),r.a.createElement(M.a,{native:!0,value:a.props.value,onChange:a.props.onChange,className:"config-select",input:r.a.createElement(W.a,{labelWidth:a.state.labelWidth,name:"shot-interval",id:"shot-interval"})},r.a.createElement("option",{value:30},"30 seconds"),r.a.createElement("option",{value:60},"60 seconds"),r.a.createElement("option",{value:90},"90 seconds"),r.a.createElement("option",{value:120},"120 seconds"),r.a.createElement("option",{value:150},"150 seconds"),r.a.createElement("option",{value:180},"180 seconds")))},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.setState({labelWidth:c.a.findDOMNode(this.InputLabelRef).offsetWidth})}}]),t}(r.a.Component),U=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={labelWidth:0},a}return Object(v.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.props.devices.length>0&&this.setState({labelWidth:c.a.findDOMNode(this.InputLabelRef).offsetWidth})}},{key:"createOptions",value:function(){var e=[],t=!0,a=!1,n=void 0;try{for(var s,c=this.props.devices[Symbol.iterator]();!(t=(s=c.next()).done);t=!0){var o=s.value,i=r.a.createElement("option",{key:o.id,value:o.id},o.name);e.push(i)}}catch(l){a=!0,n=l}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}return e}},{key:"render",value:function(){var e=this;return this.props.devices.length>0?r.a.createElement(H.a,{className:"select-form-control",variant:"outlined"},r.a.createElement(D.a,{ref:function(t){e.InputLabelRef=t},htmlFor:"device"},"Device"),r.a.createElement(M.a,{native:!0,value:this.props.value,onChange:this.props.onChange,className:"config-select",input:r.a.createElement(W.a,{labelWidth:this.state.labelWidth,name:"device",id:"device"})},this.createOptions())):r.a.createElement("p",null,"Open Spotify on this or another device")}}]),t}(r.a.Component),V=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){var e=a.props.gameHasStarted?a.props.gameIsPaused?"play_arrow":"pause":"play_arrow";return r.a.createElement(E.a,{variant:"round",color:"primary",onClick:a.props.onClick},r.a.createElement(I.a,null,e))},a}return Object(v.a)(t,e),t}(r.a.Component),$=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){var e=a.props.minutes.toString().padStart(2,"0"),t=a.props.seconds.toString().padStart(2,"0");return r.a.createElement("span",{className:"timer"},e,":",t)},a}return Object(v.a)(t,e),t}(r.a.Component),q=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){return r.a.createElement("div",{className:"track-information"},r.a.createElement("img",{src:a.props.albumImage,alt:a.props.albumName,width:"175",height:"175"}),r.a.createElement("p",{className:"song-name"},a.props.songName),r.a.createElement("p",{className:"artists"},a.props.artists))},a}return Object(v.a)(t,e),t}(r.a.Component),K=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e={visibility:this.props.gameHasStarted?"visible":"hidden",marginTop:"12px",marginBottom:"12px"};return r.a.createElement(b.a,{variant:"outlined",color:"secondary",size:"small",style:e,onClick:this.props.onClick},"Restart")}}]),t}(r.a.Component),Q=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){return r.a.createElement("div",{className:"config"},r.a.createElement(J,{value:a.props.gameLengthMinutes,onChange:a.props.gameLengthSelectChangeHandler,gameHasStarted:a.props.gameHasStarted}),r.a.createElement(G,{value:a.props.shotIntervalSeconds,onChange:a.props.shotIntervalSelectChangeHandler}),r.a.createElement(U,{value:a.props.currentDeviceID,onChange:a.props.deviceSelectChangeHandler,devices:a.props.devices}))},a}return Object(v.a)(t,e),t}(r.a.Component),X=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){return r.a.createElement("div",{className:"game"},r.a.createElement(V,{onClick:a.props.startButtonClickHandler,gameHasStarted:a.props.gameHasStarted,gameIsPaused:a.props.gameIsPaused}),r.a.createElement($,{minutes:a.props.minutes,seconds:a.props.seconds}),r.a.createElement(q,{songName:a.props.songName,artists:a.props.artists,albumImage:a.props.albumImage,albumName:a.props.albumName}),r.a.createElement(K,{onClick:a.props.restartButtonClickHandler,gameHasStarted:a.props.gameHasStarted}))},a}return Object(v.a)(t,e),t}(r.a.Component),Y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).render=function(){return r.a.createElement("div",{className:"footer"},r.a.createElement(k.a,null,r.a.createElement(I.a,null,"home")),r.a.createElement(k.a,null,r.a.createElement(j.a,{viewBox:"0 0 16 16"},r.a.createElement("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}))))},a}return Object(v.a)(t,e),t}(r.a.Component),Z=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).getInitialState=function(){return{gameLengthMinutes:60,shotIntervalSeconds:60,minutes:60,seconds:0,devices:[],currentDeviceID:"",gameIsPaused:!0,gameHasStarted:!1,gameHasEnded:!1,tickIntervalID:null,songName:null,artists:null,albumImage:null,albumName:null}},a.componentDidMount=Object(u.a)(i.a.mark(function e(){var t,n,r,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([F.getMyDevices(),F.getMyCurrentPlaybackState()]);case 2:t=e.sent,n=Object(l.a)(t,2),r=n[0].devices,s=n[1].device,a.setState({devices:r,currentDeviceID:s?s.id:""}),setInterval(function(){return a.getDevices()},5e3),setInterval(function(){return a.getCurrentTrack()},900);case 9:case"end":return e.stop()}},e)})),a.getDevices=Object(u.a)(i.a.mark(function e(){var t,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.getMyDevices();case 2:t=e.sent,n=t.devices,a.setState({devices:n});case 5:case"end":return e.stop()}},e)})),a.getCurrentTrack=Object(u.a)(i.a.mark(function e(){var t,n,r,s,c,o,l,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.getMyCurrentPlayingTrack();case 2:if(t=e.sent,n=a.state.gameIsPaused,a.state.gameHasStarted&&(n=!t.is_playing),r=t.item?t.item.name:"",s="",t.item&&t.item.artists)for(c=0;c<t.item.artists.length;c++)o=t.item.artists[c],s+=o.name,c<t.item.artists.length-1&&(s+=", ");l=t.item?t.item.album.images[0].url:"",u="",t&&t.item&&t.item.album&&t.item.album.name&&(u=t.item.album.name),a.setState({gameIsPaused:n,songName:r,artists:s,albumImage:l,albumName:u});case 12:case"end":return e.stop()}},e)})),a.gameLengthSelectChangeHandler=function(e){var t=e.target.value,n=t;a.setState({gameLengthMinutes:t,minutes:n})},a.shotIntervalSelectChangeHandler=function(e){var t=e.target.value;a.setState({shotIntervalSeconds:t})},a.deviceSelectChangeHandler=function(){var e=Object(u.a)(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({currentDeviceID:t.target.value}),e.next=3,F.transferMyPlayback([t.target.value]);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.startButtonClickHandler=Object(u.a)(i.a.mark(function e(){var t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.state.gameHasStarted||(t=setInterval(function(){return a.tick()},1e3),a.setState({gameHasStarted:!0,tickIntervalID:t})),!a.state.gameIsPaused){e.next=6;break}return e.next=4,F.play({device_id:a.state.currentDeviceID});case 4:e.next=8;break;case 6:return e.next=8,F.pause();case 8:case"end":return e.stop()}},e)})),a.tick=function(){if(!a.state.gameIsPaused){var e=a.state.seconds-1,t=a.state.minutes;e<0&&(e=59,t-=1),a.setState({seconds:e,minutes:t}),((60*(a.state.gameLengthMinutes-a.state.minutes)+(60-a.state.seconds))%a.state.shotIntervalSeconds===0||0===t&&0===e)&&F.skipToNext(),0===t&&0===e&&(a.setState({gameHasEnded:!0}),clearInterval(a.state.tickIntervalID))}},a.restartButtonClickHandler=function(){window.location=window.location.href},a.render=function(){var e={backgroundImage:"url(".concat(a.state.albumImage,")")};return r.a.createElement(g.MuiThemeProvider,{theme:z},r.a.createElement("div",{className:"App",style:e},r.a.createElement("div",{className:"dimmer"},r.a.createElement("div",{className:"container"},r.a.createElement("h2",null,"Power Hour"),r.a.createElement(Q,{gameHasStarted:a.state.gameHasStarted,gameLengthMinutes:a.state.gameLengthMinutes,gameLengthSelectChangeHandler:a.gameLengthSelectChangeHandler,shotIntervalSeconds:a.state.shotIntervalSeconds,shotIntervalSelectChangeHandler:a.shotIntervalSelectChangeHandler,currentDeviceID:a.state.currentDeviceID,deviceSelectChangeHandler:a.deviceSelectChangeHandler,devices:a.state.devices}),r.a.createElement(X,{startButtonClickHandler:a.startButtonClickHandler,gameHasStarted:a.state.gameHasStarted,gameIsPaused:a.state.gameIsPaused,minutes:a.state.minutes,seconds:a.state.seconds,songName:a.state.songName,artists:a.state.artists,albumImage:a.state.albumImage,albumName:a.state.albumName,restartButtonClickHandler:a.restartButtonClickHandler}),r.a.createElement(Y,null)))))},a.state=a.getInitialState(),a}return Object(v.a)(t,e),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[100,1,2]]]);
//# sourceMappingURL=main.b6ca1583.chunk.js.map