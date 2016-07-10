define("ops:static/js/utils/utils.js",function(require,exports,module){Date.prototype.format=function(t){var e,n={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(e in n)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[e]:("00"+n[e]).substr((""+n[e]).length)));return t};var util={format:function(t,e){return t.replace(/\{(\w+)\}/g,function(t,n){return"undefined"==typeof e[n]||null==e[n]?"":e[n]})},getNoPicUrl:function(){return"images/nopic.gif"},stretchImg:function(t,e,n,r,o){var i=new Image;t.onerror=function(){this.src=util.getNoPicUrl(),this.style.display=""},i.onload=function(){var i,s,l,a,u=this.width,c=this.height,h=Math.max(e/u,n/c);o&&(h=Math.min(e/u,n/c)),i=parseInt(h*u,10)||e,s=parseInt(h*c,10)||n,t.style.width=i+"px",t.style.height=s+"px",a=parseInt((n-s)/2,10),l=parseInt((e-i)/2,10),r&&$(t).css({"margin-top":a,"margin-left":l}),t.style.display=""},i.src=t.src},reloadImg:function(t){function e(t){r.css("visibility","visible").show().attr("src",t)}var n=this,r=t.find("img");r=r[0]?r:t,r.css("visibility","hidden").hide();var o=r.attr("src"),i=new Image;i.onload=function(){e(o)},i.onerror=function(){e(n.getNoPicUrl())},i.src=o},errorImg:function(t){t.src=util.getNoPicUrl()},getPartnerslink:function(t,e,n){return t&&e&&n?e+"&"+$.param($.extend({},n,{from:"inf",fun:t})):e||""},parseGeo:function(t){if("string"==typeof t){var e=t.split("|"),n=parseInt(e[0]),r=e[1],o=e[2],i=o.split(";"),s=[];switch(n){case 1:s.push(i[0]);break;case 2:case 3:for(var l=0;l<i.length-1;l++){var a=i[l];if(a.length>100)a=a.replace(/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g,"$1,$2;"),s.push(a);else{for(var u=[],c=a.split(","),h=0;h<c.length;h+=2){var f=c[h],g=c[h+1];u.push(f+","+g)}s.push(u.join(";"))}}}return s.length<=1&&(s=s.toString()),{type:n,bound:r,points:s}}},getPointByStr:function(t,e){if("string"==typeof t){var n=t.split(",");if(!(n.length<2)&&"undefined"!=typeof BMap){var r=new BMap.Pixel(n[0],n[1]),e=e||window.map;return e.getMapType().getProjection().pointToLngLat(r)}}},loadJs:function(t,e){var n=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.src=t,r.onload=r.onreadystatechange=function(){r.onload=r.onreadystatechange=null,e()},n.appendChild(r)},loadCss:function(t,e){var n=document.getElementsByTagName("head")[0],r=document.createElement("link"),e=e||function(){};r.type="text/css",r.href=t,r.rel="stylesheet",n.appendChild(r),"sheet"in r?(sheet="sheet",cssRules="cssRules"):(sheet="styleSheet",cssRules="rules");var o=setInterval(function(){try{r[sheet]&&r[sheet][cssRules].length&&(clearInterval(o),clearTimeout(i),e())}catch(t){}finally{}},20),i=setTimeout(function(){clearInterval(o),clearTimeout(i),e()},1e3)},dateFormat:function(t,e){var n=t,r={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),S:n.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));for(var o in r)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?r[o]:("00"+r[o]).substr((""+r[o]).length)));return e},jstime:function(t){t?(this.__start&&(this.__time=this.__time||[],this.__time.push(t+":"+((new Date).getTime()-this.__start)+"ms")),this.__start=(new Date).getTime()):alert(this.__time.join("\n"))},getStrLength:function(t){var e=t.match(/[^\x00-\xff]/gi);return t.length+(null==e?0:e.length)},SubString:function(t,e){var n=/[^\x00-\xff]/g;if(t.replace(n,"mm").length<=e)return t;for(var r=Math.floor(e/2),o=r;o<t.length;o++)if(t.substr(0,o).replace(n,"mm").length>=e)return t.substr(0,o);return t},scrollController:function(t,e){var n=$(t)[0].getBoundingClientRect().bottom-Math.min(document.documentElement.clientHeight,document.body.clientHeight),r=document.body.scrollTop,o=document.documentElement.scrollTop,i=0,s=(new Date).getTime(),l=1,a=setInterval(function(){var t=(new Date).getTime(),u=Math.min(1,(t-s)/e),c=i+(n-i)*u;document.body.scrollTop=r+c,document.documentElement.scrollTop=o+c,u>=l&&(clearInterval(a),document.body.scrollTop=r+n,document.documentElement.scrollTop=o+n)},15)},getParams:function(t){var e,n,r,o={};if(t=t||window.location.href,-1==t.indexOf("?"))return o;for(n=t.slice(t.indexOf("?")+1).split("&"),r=0;r<n.length;r++)n[r]&&-1!=n[r].indexOf("=")&&(e=n[r].split("="),o[e[0]]=-1!=e[1].indexOf("#")?e[1].slice(0,e[1].indexOf("#")):e[1]);return o},getParam:function(t,e){return this.getParams(e)[t]},evalInContext:function(script,context){return function(){return eval(script)}.call(context)},getValueByKeypath:function(t,e){if(t&&e){this.obj=t;try{return this.evalInContext("this.obj."+e,this)}catch(n){}}},now:function(){return(new Date).getTime()},urlToJSON:function(t){if(!t)return{};var e,n,r,o={},i=t.split("&");for(e=0,r=i.length;r>e;e++)n=i[e].split("="),o[n[0]]=decodeURIComponent(n[1]);return o},jsonToUrl:function(t){if(!t)return"";var e,n=[];for(e in t)t.hasOwnProperty(e)&&n.push(e+"="+encodeURIComponent(t[e]));return n.join("&")},openBrowser:function(t){return"function"==typeof window.cefQuery?(window.cefQuery({request:"Window.OpenUrl:"+t}),!0):!1}};!function(){function t(){function t(t){return 13==t.keyCode&&l(),e.hasOwnProperty(t.keyCode)?e[t.keyCode]="keydown"===t.type:void 0}var e;e={37:!1,39:!1},String.prototype.replaceAt=function(t,e){return this.substr(0,t)+e+this.substr(t+e.length)};var n,r,o,i,s,l,a,u,c;document.onkeydown=t,document.onkeyup=t,console.log("----按下回车键 开始游戏---"),o="#",a=100,c=0,u=!0,i="-",n=function(){function t(){this.x=Math.floor(a/2),this.char="(・ˍ・*)"}return t}(),r=function(){function t(){this.x=0,this.v=!0,this.peak=Math.floor(Math.random()*(a/2))}return t.prototype.toggle=function(){return this.v=this.v?!1:!0,this.v?this.peak=Math.floor(Math.random()*(a/2+20)):void 0},t.prototype.tick=function(){return this.v?this.x+=1:this.x-=1,(this.x>=this.peak||this.x<=0)&&this.toggle(),this},t.prototype.render=function(){var t;return function(){var e,n,r;for(r=[],t=e=0,n=this.x;n>=0?n>=e:e>=n;t=n>=0?++e:--e)r.push(o);return r}.call(this).join("")},t}(),s=function(){u=!0,console.log("你的成绩:"+c+" 关!")},l=function(){var t,o,l,h;if(u)return u=!1,h=[new r,new r],t=new n,c=0,o=function(t){return console.log(t,""+c+" level")},l=function(){var n,r,u,f,g,p,d;if(f=a-h[0].x-h[1].x,r=function(){var t,e;for(e=[],n=t=0;f>=0?f>=t:t>=f;n=f>=0?++t:--t)e.push(i);return e}().join(""),u=h[0].render()+r+h[1].render(),u[t.x]!==i)return s();for(u=u.replaceAt(t.x,t.char),c>200&&450>c?(201===c&&console.log("%c ----------困难模式!----------","color:red"),c%2===0&&o(u)):o(u),p=0,d=h.length;d>p;p++)g=h[p],g.tick();return e[39]&&(t.x+=1),e[37]&&(t.x-=1),c+=1,setTimeout(l,Math.max(1,1e3/(10+c/25)))},l(),"Lets go!"}}var e="\n                             (_)               (_)            \n               __      ____ _ _ _ __ ___   __ _ _  ___  _ __\n               \\ \\ /\\ / / _` | | '_ ` _ \\ / _` | |/ _ \\| '_ \\ \n                \\ V  V / (_| | | | | | | | (_| | | (_) | |_) |\n                 \\_/\\_/ \\__,_|_|_| |_| |_|\\__,_|_|\\___/| .__/\n                                                       | |\n                                                       |_|\n";console.log(e),t()}(),module.exports=util});