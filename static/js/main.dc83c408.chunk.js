(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports={container:"Page_container__1D7sd",title:"Page_title__1nPMM",link:"Page_link__1XPas",button:"Page_button__ZuEiA"}},16:function(e,t,a){e.exports={container:"Default_container__bnkX6",text:"Default_text__xSAez",button:"Default_button__25b99",disable:"Default_disable__1kL8S"}},30:function(e,t,a){e.exports=a(50)},35:function(e,t,a){},36:function(e,t,a){},5:function(e,t,a){e.exports={container:"Landing_container__3cFkZ",main:"Landing_main__TO3Of",input:"Landing_input__FKYRR",button:"Landing_button__3Jkyp",title:"Landing_title__3Fy2R",header:"Landing_header__3OomK",subheader:"Landing_subheader__2vVjk",hour:"Landing_hour__1xuB_",amount:"Landing_amount__1JcXb",conatiner:"Landing_conatiner__2kdFI"}},50:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(26),o=a.n(r),i=(a(35),a(13)),c=(a(36),a(8)),l=a(9),u=a(11),m=a(10),h=a(12),p=a(7),d=a(5),f=a.n(d),v=a(19),_=a.n(v),b=(a(42),a(24),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChangeMonths=function(e){a.setState({months:e}),1==e?a.setState({m:""}):a.setState({m:"s"}),console.log(a.state.months)},a.handleChange=function(e){a.setState({value:e}),1==e?a.setState({s:""}):a.setState({s:"s"})},a.state={inputValue:"",value:10,months:6,disabled:!0,s:"s",m:"s"},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){fetch("https://ancient-dusk-43980.herokuapp.com/440/news").then(function(e){return e.json()}).then(function(e){console.log(e)})}},{key:"updateInputValue",value:function(e){17===e.target.value.length?this.setState({disabled:!1}):this.setState({disabled:!0}),this.setState({inputValue:e.target.value})}},{key:"render",value:function(){var e=this,t=this.state,a=t.value,n=t.months;return s.a.createElement("div",{className:f.a.container},s.a.createElement("div",{className:f.a.title},s.a.createElement("div",{className:f.a.header},"Steam News Generator"),s.a.createElement("div",{className:f.a.subheader},"Recent news within ",s.a.createElement("span",{className:f.a.amount},n)," month",this.state.m," for your most recent and favorite games!")),s.a.createElement("div",{className:f.a.main},s.a.createElement("input",{className:f.a.input,type:"search",value:this.state.inputValue,onChange:function(t){return e.updateInputValue(t)},placeholder:"Enter 17 digit steam ID"}),s.a.createElement("div",{className:"slider"},s.a.createElement(_.a,{min:1,max:100,value:a,onChange:this.handleChange}),s.a.createElement("div",{className:"slider"},s.a.createElement(_.a,{min:1,max:12,step:1,value:n,onChange:this.handleChangeMonths}),s.a.createElement("div",{className:"value"},a),s.a.createElement(p.b,{style:{textDecoration:"none"},className:f.a.link,to:"/".concat(this.state.inputValue,"/").concat(this.state.value,"/").concat(this.state.months)},s.a.createElement("button",{disabled:this.state.disabled,className:f.a.button},"Search games above ",s.a.createElement("span",{className:f.a.hour},a)," hour",this.state.s)," ")))))}}]),t}(n.Component)),g=a(21),E=a.n(g),k=a(29),y=a(6),N=a.n(y),w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={articles:[],isDone:!1},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=function(){var t=Object(k.a)(E.a.mark(function t(){var a,n,s,r;return E.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=function(){return fetch("https://ancient-dusk-43980.herokuapp.com/".concat(e.props.steamID)).then(function(e){return e.json()}).then(function(t){var a=[];(t=t.response).hasOwnProperty("games")&&t.games.forEach(function(t){t.playtime_forever>60*e.props.value&&a.push(t.appid)});return a})},n=function(){return fetch("https://ancient-dusk-43980.herokuapp.com/".concat(e.props.steamID,"/recent")).then(function(e){return e.json()}).then(function(e){var t=[];(e=e.response).hasOwnProperty("games")&&e.games.forEach(function(e){t.push(e.appid)});return t})},s=[],t.next=5,Promise.all([a(),n()]).then(function(e){for(var t=0;t<2;t++)e[t].forEach(function(e){s.push(e)});return s=s.filter(function(e,t,a){return a.indexOf(e)===t})});case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),a=[];t().then(function(t){var n=t.map(function(e){return fetch("https://ancient-dusk-43980.herokuapp.com/".concat(e,"/news")).then(function(e){return e.json()}).then(function(e){return e.appnews.newsitems.forEach(function(e){a.push(e)}),console.log("why so long"),e})});Promise.all(n).then(function(t){a.sort(function(e,t){return t.date-e.date});var n=[];a.forEach(function(t){var a=Math.round((new Date).getTime()/1e3);a-=2582e3*e.props.months,t.date>a&&n.push(t)}),n.forEach(function(e){e.date=new Date(1e3*e.date).toString().substring(0,15)}),e.setState({articles:n,isDone:!0})})})}},{key:"render",value:function(){return s.a.createElement("div",{className:N.a.main},0===this.state.articles.length&&!0===this.state.isDone?s.a.createElement("div",{className:N.a.private},"Unable to retrieve data from server. Check"," ",s.a.createElement("span",null,s.a.createElement("a",{className:N.a.settings,style:{textDecoration:"none",color:"grey"},href:"https://steamcommunity.com/my/edit/settings"},"here"))," ","to make sure your profile is public or try a different steam ID"):this.state.articles.map(function(e,t){return s.a.createElement("div",{key:t,className:N.a.articles},s.a.createElement("div",{className:N.a.title},e.title),s.a.createElement("div",{className:N.a.autor},"Author: ",e.author),s.a.createElement("div",{className:N.a.feed},"Feed: ",e.feedlabel),s.a.createElement("div",{className:N.a.date},"Date: ",e.date),s.a.createElement("a",{style:{textDecoration:"none"},href:"".concat(e.url),target:"_blank",className:N.a.link},"Link to full article"))}))}}]),t}(n.Component),O=a(15),j=a.n(O),D=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={s:"s",m:"s"},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.location.pathname.endsWith("/1")&&this.setState({m:""}),this.props.location.pathname.includes("/1/")&&this.setState({s:""})}},{key:"render",value:function(){var e=this.props.location.pathname.split("/");return s.a.createElement("div",{className:j.a.container},s.a.createElement("div",{className:j.a.title},"Here's news within the past ",e[3]," month",this.state.m," for games you've played recently, as well as games you've played for more than ",e[2]," hour",this.state.s,". If the list is smaller than you think, check your steam privacy settings!"),s.a.createElement(p.b,{style:{textDecoration:"none"},className:j.a.link,to:"/"},s.a.createElement("div",{className:j.a.button},"New Search")," "),s.a.createElement(w,{steamID:e[1],value:e[2],months:e[3]}))}}]),t}(n.Component),x=a(16),S=a.n(x),C=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:S.a.container},s.a.createElement("h1",null,"error"),s.a.createElement("h2",null,"page not found"),s.a.createElement("h3",null,"the requested URL ",s.a.createElement("span",{className:S.a.text},this.props.location.pathname)," was not found"),s.a.createElement(p.b,{style:{textDecoration:"none"},className:S.a.link,to:"/"},s.a.createElement("div",{className:S.a.button},"Click here to go back")," "))}}]),t}(n.Component);var L=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(i.c,null,s.a.createElement(i.a,{path:"/",exact:!0,component:b}),s.a.createElement(i.a,{path:"/:id/:value/:months",exact:!0,component:D}),s.a.createElement(i.a,{component:C})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(p.a,{basename:"/SteamApp"},s.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,a){e.exports={main:"Results_main__1JASj",articles:"Results_articles__p4JyB",title:"Results_title__2Ttx4",link:"Results_link__UH-gB",private:"Results_private__2COTd"}}},[[30,1,2]]]);
//# sourceMappingURL=main.dc83c408.chunk.js.map