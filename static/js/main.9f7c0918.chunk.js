(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(t,e,n){t.exports=n(37)},27:function(t,e,n){},28:function(t,e,n){},37:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),c=n(19),r=n.n(c),i=(n(27),n(5)),u=(n(28),n(8)),l=n(9),s=n(11),h=n(10),p=n(12),f=n(7),m=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(s.a)(this,Object(h.a)(e).call(this,t))).state={inputValue:""},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){}},{key:"updateInputValue",value:function(t){this.setState({inputValue:t.target.value}),console.log(this.state)}},{key:"render",value:function(){var t=this;return o.a.createElement("div",null,o.a.createElement("input",{type:"search",value:this.state.inputValue,onChange:function(e){return t.updateInputValue(e)},placeholder:"Enter steam ID"}),o.a.createElement(f.b,{to:"/".concat(this.state.inputValue)},o.a.createElement("div",null,"search")," "))}}]),e}(a.Component),d=function(t){function e(t){var n;return Object(u.a)(this,e),(n=Object(s.a)(this,Object(h.a)(e).call(this,t))).state={},n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentWillMount",value:function(){var t=this,e=this.props.location.pathname;console.log(e);var n=[],a=this;this.news=[],fetch("http://localhost:5000".concat(e)).then(function(t){return t.json()}).then(function(o){if((o=o.response).hasOwnProperty("games")){var c=o.games;console.log(c),c.forEach(function(t){t.playtime_forever>2250&&n.push(t.appid)})}fetch("http://localhost:5000".concat(e,"/recent")).then(function(t){return t.json()}).then(function(t){(t=t.response).hasOwnProperty("games")&&t.games.forEach(function(t){n.push(t.appid)});return n=n.filter(function(t,e,n){return n.indexOf(t)===e}),console.log(n),n}).then(function(e){e.forEach(function(e){fetch("http://localhost:5000/".concat(e,"/news")).then(function(t){return t.json()}).then(function(e){(e=e.appnews.newsitems).forEach(function(e){t.news.push(e),a.setState({total:t.news})})})})})})}},{key:"render",value:function(){if(this.state&&this.state.total)var t=this.state.total.map(function(t){return o.a.createElement("h1",null,t.title)});return o.a.createElement("div",null,o.a.createElement("h1",null,"asdfdsf"),o.a.createElement("div",null,t))}}]),e}(a.Component);var v=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(i.c,null,o.a.createElement(i.a,{path:"/",exact:!0,component:m}),o.a.createElement(i.a,{path:"/:id",exact:!0,component:d})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(f.a,{basename:"/SteamApp"},o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.9f7c0918.chunk.js.map