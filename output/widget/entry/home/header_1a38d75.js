define("ops:widget/entry/home/header.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=e("react"),r=l(n),u=e("antd"),d=e("react-router"),s=e("reqwest"),o=l(s),i=u.Menu.SubMenu,c=r["default"].createClass({displayName:"Header",getInitialState:function(){return{userName:""}},componentDidMount:function(){this.responseHeader()},responseHeader:function(){var e=this;o["default"]({type:"HEAD",url:"/index.html"}).then(function(t){var a=t.getResponseHeader("UUAP-USERNAME");e.setState({userName:a})})},render:function(){var e="right",t="#51789f";return r["default"].createElement("div",null,r["default"].createElement("div",{className:"header"},r["default"].createElement("div",{className:"logo"},r["default"].createElement("a",{href:"/index.html"},r["default"].createElement("img",{src:"./img/logo2.png"}))),r["default"].createElement("div",{className:"menu"},r["default"].createElement(u.Menu,{mode:"horizontal",style:{background:t}},r["default"].createElement(u.Menu.Item,{key:"mail",style:{"float":e}},r["default"].createElement(d.Link,{to:"/mainengine/batchmanage"},"DashBoard")),r["default"].createElement(u.Menu.Item,{key:"app",style:{"float":e},disabled:!0},r["default"].createElement(d.Link,{to:"/online/list"},"上线系统")))),r["default"].createElement("div",{className:"user-info"},r["default"].createElement(u.Menu,{mode:"horizontal",style:{background:t,color:"#fff"}},r["default"].createElement(i,{style:{"float":e},title:r["default"].createElement("span",null,r["default"].createElement(u.Icon,{type:"setting"}),this.state.userName),key:"k"},r["default"].createElement(u.Menu.Item,{key:"1"},"个人信息"),r["default"].createElement(u.Menu.Item,{key:"4"},r["default"].createElement("a",{href:"/logout"},"退出")))))),r["default"].createElement("div",{id:"lala"},this.props.children))}});t["default"]=c,a.exports=t["default"]});