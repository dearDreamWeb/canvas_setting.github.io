(this.webpackJsonpcanvas_setting=this.webpackJsonpcanvas_setting||[]).push([[0],{14:function(e,t,n){e.exports={sliderCanvas_wrap:"Slider_sliderCanvas_wrap__1KOHy",sliderCanvas:"Slider_sliderCanvas__3mqz9",rate_text:"Slider_rate_text__1Htey"}},16:function(e,t,n){e.exports={showPattern_wrap:"ShowPattern_showPattern_wrap__1NLEA",webgl_canvas:"ShowPattern_webgl_canvas__2YlOs"}},27:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(17),i=n.n(r),o=(n(27),n(3)),c=n(5),s=n.n(c),l=n(7),u=n(4),h=n.n(u),f=n(2),d={drawType:null,fillColor:"#000",strokeColor:"#000",lineW:0,lineType:"solid",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"#000",scale:50,rotate:0,opacity:100,textInput:"Canvas\u5b9e\u9a8c\u5ba4",fontSize:"36",textAlign:"left",textBaseline:"top",textDir:"ltr",imgUrl:"http://pic.616pic.com/ad_preview/00/09/19/5d50c8bfe378b.jpg-0.jpg!/fw/800/quality/90/unsharp/true/compress/true?%3E",sliceX:0,sliceY:0,originX:0,originY:0,rectParams:{x:50,y:50,width:100,height:100,oCoords:{tl:{x:50,y:50},tr:{x:150,y:50},br:{x:150,y:150},bl:{x:50,y:150}},lines:{topLine:{o:{x:50,y:50},d:{x:150,y:50}},leftLine:{o:{x:50,y:50},d:{x:50,y:150}},rightLine:{o:{x:150,y:50},d:{x:150,y:150}},bottomLine:{o:{x:50,y:150},d:{x:150,y:150}}},controlPoints:[{x:45,y:45},{x:145,y:45},{x:45,y:145},{x:145,y:145},{x:95,y:45},{x:95,y:145},{x:45,y:95},{x:145,y:95},{x:95,y:10}],controlPointsType:["tl","tr","bl","br","tc","bc","lc","rc","rp"],isRectSelected:!1}},v=function(e,t){switch(t.type){case"resetState":return Object(f.a)(Object(f.a)({},d),{},{drawType:"reset"});case"changeState":return Object(f.a)(Object(f.a)({},e),t.data);case"changeRect":return Object.assign(e,{rectParams:Object(f.a)({},t.data)});default:return e}},x=Object(a.createContext)({}),y=n(14),b=n.n(y),g=n(0),p={canvasDom:null,ctx:null,canvasW:0,canvasH:0};var j=function(e){var t=e.onChange,n=e.text,r=e.value,i=e.type,c=Object(a.useRef)(null),s=Object(a.useState)(p),l=Object(o.a)(s,2),u=l[0],h=l[1],d=Object(a.useState)(!1),v=Object(o.a)(d,2),y=(v[0],v[1],Object(a.useState)(!1)),j=Object(o.a)(y,2),m=j[0],w=j[1],O=Object(a.useContext)(x).state;Object(a.useEffect)((function(){_()}),[]),Object(a.useEffect)((function(){r&&u.canvasDom&&P({value:r})}),[u,r]),Object(a.useEffect)((function(){if("reset"===O.drawType){var e=u.ctx,t=u.canvasW,n=u.canvasH;e.clearRect(0,0,t,n),P({value:r})}}),[O.drawType]),Object(a.useEffect)((function(){var e=u.canvasDom;e&&(P({value:r}),e.onclick=function(e){return P({e:e})},e.onmousemove=null,e.onmousedown=function(e){w(!0),P({e:e})},e.onmousemove=function(e){m&&P({e:e})},document.onmouseup=function(){w(!1),e.onmousemove=null})}),[u,m]);var _=function(){if(c.current){var e=c.current;h(Object(f.a)(Object(f.a)({},u),{},{canvasDom:e,ctx:e.getContext("2d"),canvasW:e.width,canvasH:e.height}))}},P=function(e){var n=e.e,a=e.value,r=u.ctx,i=u.canvasW,o=u.canvasH,c=u.canvasDom.getBoundingClientRect().x,s=n?n.pageX-c:a,l=i-5;if(s>=l)s=l,t&&t(100);else if(s<=5)s=5,t&&t(0);else{var h=parseInt(((s-5)/(l-5)*100).toFixed(2));t&&t(a||h)}r.clearRect(0,0,i,o),function(e,t){e.beginPath(),e.lineCap="round",e.fillStyle="#ccc",e.fillRect(0,4,t,2),e.stroke()}(r,i),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;e.beginPath(),e.fillStyle="#000",e.arc(t,5,5,0,2*Math.PI,!1),e.fill(),e.closePath()}(r,s),r.lineCap="round",r.fillRect(0,3,s,4)};return Object(g.jsxs)("div",{className:b.a.sliderCanvas_wrap,children:[n||"",Object(g.jsx)("canvas",{ref:c,className:b.a.sliderCanvas,width:"100",height:"10"}),Object(g.jsx)("span",{className:b.a.rate_text,children:"rotate"===i?(3.6*(r||0)).toFixed(0):r})]})};var m=function(){var e=Object(a.useContext)(x),t=e.state,n=e.dispatch,r=function(e,t){n({type:"changeState",data:Object(l.a)({},e,t)})},i=function(e,t){n({type:"changeState",data:Object(l.a)({},t,e.target.value?e.target.value:"#000")})},o=function(e,t){n({type:"changeState",data:Object(l.a)({},t,e.target.value)})};return Object(g.jsxs)("div",{className:h.a.setting_wrap,children:[Object(g.jsxs)("div",{className:h.a.title_wrap,children:[Object(g.jsx)("h1",{className:h.a.setting_title,children:"Canvas\u914d\u7f6e"}),Object(g.jsx)("button",{className:h.a.reset_btn,onClick:function(){n({type:"resetState"})},children:"\u521d\u59cb\u5316\u6570\u636e"})]}),Object(g.jsxs)("section",{className:h.a.setting_main,children:[Object(g.jsx)(j,{text:"\u7ebf\u5bbd\uff1a",onChange:function(e){return r("lineW",e)},value:t.lineW}),Object(g.jsx)(j,{text:"\u9634\u5f71\u6a21\u7cca\u534a\u5f84\uff1a",onChange:function(e){return r("shadowBlur",e)},value:t.shadowBlur}),Object(g.jsx)(j,{text:"\u9634\u5f71X\u8f74\u504f\u79fb\u91cf\uff1a",onChange:function(e){r("shadowOffsetX",e)},value:t.shadowOffsetX}),Object(g.jsx)(j,{text:"\u9634\u5f71Y\u8f74\u504f\u79fb\u91cf\uff1a",onChange:function(e){return r("shadowOffsetY",e)},value:t.shadowOffsetY}),Object(g.jsx)(j,{text:"\u7f29\u653e\uff1a",onChange:function(e){return r("scale",e)},value:t.scale}),Object(g.jsx)(j,{text:"\u65cb\u8f6c\uff1a",onChange:function(e){return r("rotate",e)},type:"rotate",value:t.rotate}),Object(g.jsx)(j,{text:"\u4e0d\u900f\u660e\u5ea6\uff1a",onChange:function(e){return r("opacity",e)},value:t.opacity}),Object(g.jsxs)("div",{children:["\u9634\u5f71\u989c\u8272\uff1a",Object(g.jsx)("input",{type:"text",value:t.shadowColor,onChange:function(e){return i(e,"shadowColor")},placeholder:"\u8bf7\u8f93\u5165\u9634\u5f71\u989c\u8272"})]}),Object(g.jsxs)("div",{children:["\u586b\u5145\u989c\u8272\uff1a",Object(g.jsx)("input",{type:"text",value:t.fillColor,onChange:function(e){return i(e,"fillColor")},placeholder:"\u8bf7\u8f93\u5165\u586b\u5145\u989c\u8272"})]}),Object(g.jsxs)("div",{children:["\u8fb9\u6846\u989c\u8272\uff1a",Object(g.jsx)("input",{type:"text",value:t.strokeColor,onChange:function(e){return i(e,"strokeColor")},placeholder:"\u8bf7\u8f93\u5165\u8fb9\u6846\u989c\u8272"})]}),Object(g.jsxs)("div",{children:["\u7ebf\u7684\u7c7b\u578b\uff1a",Object(g.jsxs)("select",{value:t.lineType,onChange:function(e){return o(e,"lineType")},className:h.a.select_diy,children:[Object(g.jsx)("option",{value:"solid",children:"\u5b9e\u7ebf"}),Object(g.jsx)("option",{value:"dash",children:"\u865a\u7ebf"})]})]}),"4"===t.drawType?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{children:["\u6587\u672c\u5185\u5bb9\uff1a",Object(g.jsx)("input",{type:"text",value:t.textInput,placeholder:"\u8bf7\u8f93\u5165\u6587\u672c\u5185\u5bb9",onChange:function(e){return r("textInput",e.target.value)}})]}),Object(g.jsxs)("div",{children:["\u5b57\u4f53\u5927\u5c0f\uff1a",Object(g.jsxs)("select",{value:t.fontSize,onChange:function(e){return o(e,"fontSize")},className:h.a.select_diy,children:[Object(g.jsx)("option",{value:"36",children:"36"}),Object(g.jsx)("option",{value:"44",children:"44"}),Object(g.jsx)("option",{value:"56",children:"56"})]})]}),Object(g.jsxs)("div",{children:["\u5bf9\u9f50\u65b9\u5f0f\uff1a",Object(g.jsxs)("select",{value:t.textAlign,onChange:function(e){return o(e,"textAlign")},className:h.a.select_diy,children:[Object(g.jsx)("option",{value:"left",children:"\u5de6\u5bf9\u9f50"}),Object(g.jsx)("option",{value:"center",children:"\u5c45\u4e2d\u5bf9\u9f50"}),Object(g.jsx)("option",{value:"right",children:"\u53f3\u5bf9\u9f50"})]})]}),Object(g.jsxs)("div",{children:["\u57fa\u7ebf\u5bf9\u9f50\uff1a",Object(g.jsxs)("select",{value:t.textBaseline,onChange:function(e){return o(e,"textBaseline")},className:h.a.select_diy,children:[Object(g.jsx)("option",{value:"top",children:"\u9876\u90e8"}),Object(g.jsx)("option",{value:"middle",children:"\u5c45\u4e2d"}),Object(g.jsx)("option",{value:"bottom",children:"\u5e95\u90e8"})]})]}),Object(g.jsxs)("div",{children:["\u6587\u672c\u65b9\u5411\uff1a",Object(g.jsxs)("select",{value:t.textDir,onChange:function(e){return o(e,"textDir")},className:h.a.select_diy,children:[Object(g.jsx)("option",{value:"ltr",children:"\u4ece\u5de6\u5411\u53f3"}),Object(g.jsx)("option",{value:"rtl",children:"\u4ece\u53f3\u5411\u5de6"})]})]})]}):null,"10"===t.drawType?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{children:["\u56fe\u7247\u5730\u5740\uff1a",Object(g.jsx)("input",{type:"text",value:t.imgUrl,placeholder:"\u8bf7\u8f93\u5165\u56fe\u7247\u5730\u5740",onChange:function(e){return r("imgUrl",e.target.value)}})]}),Object(g.jsx)(j,{text:"\u5207\u7247X\uff1a",onChange:function(e){return r("sliceX",e)},value:t.sliceX}),Object(g.jsx)(j,{text:"\u5207\u7247Y\uff1a",onChange:function(e){return r("sliceY",e)},value:t.sliceY}),Object(g.jsx)(j,{text:"\u539f\u70b9\u5750\u6807X\uff1a",onChange:function(e){return r("originX",e)},value:t.originX}),Object(g.jsx)(j,{text:"\u539f\u70b9\u5750\u6807Y\uff1a",onChange:function(e){return r("originY",e)},value:t.originY})]}):null]})]})},w=n(8),O=n(16),_=n.n(O);function P(e){return{topLine:{o:e.tl,d:e.tr},rightLine:{o:e.tr,d:e.br},bottomLine:{o:e.br,d:e.bl},leftLine:{o:e.bl,d:e.tl}}}function k(e,t){var n,a,r,i=0;for(var o in t)if(!((r=t[o]).o.y<e.y&&r.d.y<e.y)&&!(r.o.y>=e.y&&r.d.y>=e.y)&&(r.o.x===r.d.x&&r.o.x>=e.x?a=r.o.x:(0,n=(r.d.y-r.o.y)/(r.d.x-r.o.x),a=-(e.y-0*e.x-(r.o.y-n*r.o.x))/(0-n)),a>=e.x&&(i+=1),2===i))break;return 1===i}var C,S=function(e,t,n,a,r,i,o,c){e.save(),e.translate(n+r/2,a+i/2),e.rotate(o),e.translate(-(n+r/2),-(a+i/2)),e.strokeStyle="#f40",e.strokeRect(n,a,r,i),e.restore(),e.save();var s=t.map((function(e){return z([e.x,e.y],[n+r/2,a+i/2],o)}));e.strokeStyle="#f40",e.fillStyle="#f40",s.forEach((function(t){e.save(),e.translate(t.x,t.y),e.rotate(o),e.translate(-t.x,-t.y),e.fillRect(t.x,t.y,10,10),e.restore()}));var l={};l.topLine={o:z([n,a],[n+r/2,a+i/2],o),d:z([n+r,a],[n+r/2,a+i/2],o)},l.leftLine={o:z([n,a],[n+r/2,a+i/2],o),d:z([n,a+i],[n+r/2,a+i/2],o)},l.rightLine={o:z([n+r,a],[n+r/2,a+i/2],o),d:z([n+r,a+i],[n+r/2,a+i/2],o)},l.bottomLine={o:z([n,a+i],[n+r/2,a+i/2],o),d:z([n+r,a+i],[n+r/2,a+i/2],o)},e.restore(),c(l,s)},T=function(e,t,n,a,r,i){e.save(),e.fillStyle="#000",e.translate(t+a/2,n+r/2),e.rotate(i),e.translate(-(t+a/2),-(n+r/2)),e.fillRect(t,n,a,r),e.restore()},z=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=Object(o.a)(t,2),r=a[0],i=a[1],c=e[0]-r,s=e[1]-i,l=c*Math.cos(n)-s*Math.sin(n),u=c*Math.sin(n)+s*Math.cos(n);return{x:l+r,y:u+i}},M=function(e,t,n,a,r,i,o,c){var s=null,l=Math.floor(e.clientX-t.getBoundingClientRect().left),u=Math.floor(e.clientY-t.getBoundingClientRect().top);return n.map((function(e){return z([e.x,e.y],[r+o/2,i+c/2],a)})).forEach((function(e,t){var n=P({tl:z([e.x,e.y],[e.x,e.y],a),tr:z([e.x+10,e.y],[e.x,e.y],a),br:z([e.x+10,e.y+10],[e.x,e.y],a),bl:z([e.x,e.y+10],[e.x,e.y],a)});k({x:l,y:u},n)&&(s=t)})),function(e,t,n){var a="",r=180*n/Math.PI/45;switch(t){case 0:r<=1?a="nw-resize":r<=2?a="ne-resize":r<=3?a="e-resize":r<=4?a="se-resize":r<=5?a="s-resize":r<=6?a="sw-resize":r<=7?a="w-resize":r<=8&&(a="nw-resize");break;case 1:r<=1?a="ne-resize":r<=2?a="e-resize":r<=3?a="se-resize":r<=4?a="s-resize":r<=5?a="sw-resize":r<=6?a="w-resize":r<=7?a="nw-resize":r<=8&&(a="ne-resize");break;case 2:r<=1?a="sw-resize":r<=2?a="w-resize":r<=3?a="nw-resize":r<=4?a="ne-resize":r<=5?a="e-resize":r<=6?a="se-resize":r<=7?a="s-resize":r<=8&&(a="sw-resize");break;case 3:r<=1?a="se-resize":r<=2?a="s-resize":r<=3?a="sw-resize":r<=4?a="w-resize":r<=5?a="nw-resize":r<=6?a="ne-resize":r<=7?a="e-resize":r<=8&&(a="se-resize");break;case 4:r<=1?a="n-resize":r<=2?a="ne-resize":r<=3?a="e-resize":r<=4?a="s-resize":r<=5?a="sw-resize":r<=6?a="w-resize":r<=7?a="nw-resize":r<=8&&(a="n-resize");break;case 5:r<=1?a="s-resize":r<=2?a="sw-resize":r<=3?a="w-resize":r<=4?a="nw-resize":r<=5?a="n-resize":r<=6?a="ne-resize":r<=7?a="e-resize":r<=8&&(a="s-resize");break;case 6:r<=1?a="w-resize":r<=2?a="nw-resize":r<=3?a="n-resize":r<=4?a="ne-resize":r<=5?a="e-resize":r<=6?a="s-resize":r<=7?a="sw-resize":r<=8&&(a="w-resize");break;case 7:r<=1?a="e-resize":r<=2?a="s-resize":r<=3?a="sw-resize":r<=4?a="w-resize":r<=5?a="nw-resize":r<=6?a="n-resize":r<=7?a="ne-resize":r<=8&&(a="e-resize");break;case 8:a="move";break;default:a="default"}e.style.cursor=a}(t,s,a),s},R=function(e,t,n,a,r){e.restore();var i=n.rectParams,o=n.rotate,c=i.lines,s=i.oCoords,l=i.controlPoints,u=i.x,h=i.y,d=i.width,v=i.height,x=!1,y=3.6*o*(Math.PI/180),b=!1,g=null,p=!1;"rotate"===a?(e.clearRect(0,0,t.width,t.height),T(e,u,h,d,v,y),x=!0,i.isRectSelected&&S(e,l,u,h,d,v,y,(function(e){return c=e}))):(e.save(),e.fillRect(i.x,i.y,i.width,i.height),e.restore()),t.onmousedown=null,t.onmouseup=null,t.onmousemove=null,t.onmousedown=function(n){!function(e){var n=Math.floor(e.clientX-t.getBoundingClientRect().left),a=Math.floor(e.clientY-t.getBoundingClientRect().top);c=P(s);var r=!1;return l.map((function(e){return z([e.x,e.y],[u+d/2,h+v/2],y)})).forEach((function(e,t){var i=P({tl:z([e.x,e.y],[e.x,e.y],y),tr:z([e.x+10,e.y],[e.x,e.y],y),br:z([e.x+10,e.y+10],[e.x,e.y],y),bl:z([e.x,e.y+10],[e.x,e.y],y)});k({x:n,y:a},i)&&(r=!0)})),k({x:n,y:a},c)||x&&r}(n)?(x=!1,r(Object(f.a)(Object(f.a)({},i),{},{isRectSelected:x})),e.clearRect(0,0,t.width,t.height),T(e,u,h,d,v,y)):(g=M(n,t,l,y,u,h,d,v),b=null===g,p=null!==g,x=!0,T(e,u,h,d,v,y),S(e,l,u,h,d,v,y,(function(e){return c=e})))},t.onmouseup=function(){b=!1,p=!1,T(e,u,h,d,v,y),x&&S(e,l,u,h,d,v,y,(function(e){return c=e})),s={tl:z([u,h],[u+d/2,h+v/2],y),tr:z([u+d,h],[u+d/2,h+v/2],y),br:z([u+d,h+v],[u+d/2,h+v/2],y),bl:z([u,h+v],[u+d/2,h+v/2],y)},8===g?r(Object(f.a)(Object(f.a)({},i),{},{x:u,y:h,lines:c,controlPoints:l,isRectSelected:x,oCoords:s,width:d,height:v}),{rotate:Number((180*y/Math.PI/3.6).toFixed(0))}):r(Object(f.a)(Object(f.a)({},i),{},{x:u,y:h,lines:c,controlPoints:l,isRectSelected:x,oCoords:s,width:d,height:v}))},t.onmousemove=function(n){if(p)if(g<4){var a=u+d/2,r=h+v/2,i=u,o=h,s=n.offsetX,f=n.offsetY,j=Math.sqrt(Math.pow(a-i,2)+Math.pow(r-o,2))/Math.sqrt(Math.pow(a-s,2)+Math.pow(r-f,2));u-=(1-j)/2*d,h-=(1-j)/2*v,d+=(1-j)*d,v+=(1-j)*v,l[0]={x:u-5,y:h-5},l[1]={x:u+d-5,y:h-5},l[2]={x:u-5,y:h+v-5},l[3]={x:u+d-5,y:h+v-5},l[4]={x:u+d/2-5,y:h-5},l[5]={x:u+d/2-5,y:h+v-5},l[6]={x:u-5,y:h+v/2-5},l[7]={x:u+d-5,y:h+v/2-5},l[8]={x:u+d/2-5,y:h-40},e.clearRect(0,0,t.width,t.height),T(e,u,h,d,v,y),S(e,l,u,h,d,v,y,(function(e){return c=e}))}else if(8===g){var m=u+d/2,w=h+v/2;y=Math.PI/180*((Math.atan2(n.offsetX-m,n.offsetY-w)/Math.PI*-180+180)%360),e.clearRect(0,0,t.width,t.height),x=!0,T(e,u,h,d,v,y),S(e,l,u,h,d,v,y,(function(e){return c=e}))}b&&(u+=n.movementX,h+=n.movementY,l[0]={x:u-5,y:h-5},l[1]={x:u+d-5,y:h-5},l[2]={x:u-5,y:h+v-5},l[3]={x:u+d-5,y:h+v-5},l[4]={x:u+d/2-5,y:h-5},l[5]={x:u+d/2-5,y:h+v-5},l[6]={x:u-5,y:h+v/2-5},l[7]={x:u+d-5,y:h+v/2-5},l[8]={x:u+d/2-5,y:h-40},e.clearRect(0,0,t.width,t.height),T(e,u,h,d,v,y),S(e,l,u,h,d,v,y,(function(e){return c=e}))),x&&M(n,t,l,y,u,h,d,v)}},A=(n(12),n(18)),I=n(19),B=n(20),E=n(21),X=n(22),Y=function(e){Object(B.a)(n,e);var t=Object(E.a)(n);function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(A.a)(this,n),t.call(this,e,a)}return Object(I.a)(n,[{key:"x",get:function(){return this[0]},set:function(e){this[0]=e}},{key:"y",get:function(){return this[1]},set:function(e){this[1]=e}},{key:"length",get:function(){return Math.hypot(this.x,this.y)}},{key:"dir",get:function(){return Math.atan2(this.y,this.x)}},{key:"copy",value:function(){return new n(this.x,this.y)}},{key:"add",value:function(e){return this.x+=e.x,this.y+=e.y,this}},{key:"sub",value:function(e){return this.x-=e.x,this.y-=e.y,this}},{key:"scale",value:function(e){return this.x*=e,this.y*=e,this}},{key:"cross",value:function(e){return this.x*e.y-e.x*this.y}},{key:"dot",value:function(e){return this.x*e.x+e.y*this.y}},{key:"normalize",value:function(){var e=Math.hypot(this.x,this.y);return this.scale(1/e)}},{key:"rotate",value:function(e){var t=Math.cos(e),n=Math.sin(e),a=Object(o.a)(this,2),r=a[0],i=a[1];return this.x=r*t+i*-n,this.y=r*n+i*t,this}}]),n}(Object(X.a)(Array)),N=function e(t,n,a,r,i,o){var c=(new Y).rotate(i).scale(a),s=n.copy().add(c);if(t.lineWidth=r,t.beginPath(),t.moveTo.apply(t,Object(w.a)(n)),t.lineTo.apply(t,Object(w.a)(s)),t.stroke(),r>2){var l=Math.PI/4+.5*(i+.2)+o*(Math.random()-.5),u=Math.PI/4+.5*(i-.2)+o*(Math.random()-.5);e(t,s,.9*a,.8*r,l,.9*o),e(t,s,.9*a,.8*r,u,.9*o)}if(r<3&&Math.random()<.5){t.save(),t.strokeStyle="#c72c35";var h=6*Math.random()+3;t.lineWidth=h,t.beginPath(),t.moveTo.apply(t,Object(w.a)(s)),t.lineTo(s.x,s.y-2),t.stroke(),t.restore()}},F=function(e,t){e.restore(),e.save(),e.translate(0,t.height),e.scale(1,-1),e.lineCap="round";var n=new Y(t.width/2,0);N(e,n,50,10,1,3),e.restore()},L=[3,4,5,6,30,100],D=window,W={showFilter:!1,countArr:[100,1e3,5e3,1e4,5e4,1e5]},q=10,H=25,U=H/1.3,J=[],V=0,G=W.countArr[V];function K(e,t,n){var a=0,r=0,i=0;e.restore(),W.countArr.forEach((function(e,t){J.push({tl:{x:q,y:H*(t+1.3)},tr:{x:q+U,y:H*(t+1.3)},bl:{x:q,y:H*(t+1.3)+U},br:{x:q+U,y:H*(t+1.3)+U}})})),C={tl:{x:q,y:H*(W.countArr.length+1.3)},tr:{x:q+U,y:H*(W.countArr.length+1.3)},bl:{x:q,y:H*(W.countArr.length+1.3)+U},br:{x:q+U,y:H*(W.countArr.length+1.3)+U}},t.onclick=function(e){var t=e.offsetX,n=e.offsetY;J.forEach((function(e,a){var r=P(e);k({x:t,y:n},r)&&(V=a,G=W.countArr[V])}));var a=P(C);k({x:t,y:n},a)&&(W.showFilter=!W.showFilter)},e.save(),requestAnimationFrame((function(){return Z(e,t,(function(t){var o=t.upDateTime,c=t.newRafId;if(n({newRafId:c}),a){var s=Number((1/((o-a)/1e3)).toFixed(0));a=o,e.save(),e.filter="blur(0)",e.fillStyle="rgba(255,255,255,0.9)",e.fillRect(0,0,130,H*(W.countArr.length+2.5)),e.fillStyle="#f40",e.font="normal 16pt Arial",r%30===0?(e.fillText("".concat(s,"FPS"),q,H),i=s):e.fillText("".concat(i,"FPS"),q,H),function(e,t){e.save(),W.countArr.forEach((function(n,a){e.lineWidth=.1,t===a?(e.fillStyle="#f40",e.fillRect(q,H*(a+1.3),U,U)):(e.fillStyle="#000",e.strokeRect(q,H*(a+1.3),U,U)),e.fillText(n.toString(),35,H*(a+2))})),W.showFilter?(e.fillStyle="#f40",e.fillRect(q,H*(W.countArr.length+1.3),U,U)):(e.fillStyle="#000",e.strokeRect(q,H*(W.countArr.length+1.3),U,U));e.fillText("".concat(W.showFilter?"\u5173\u95ed\u6a21\u7cca":"\u5f00\u542f\u6a21\u7cca"),35,H*(W.countArr.length+2)),e.restore()}(e,V),e.restore()}else a=o;r++}))})),e.restore()}function Z(e,t,n){var a=t.width,r=t.height;e.save(),W.showFilter&&(e.filter="blur(5px)");var i=new D.OffscreenCanvas(t.width,t.height),o=i.getContext("2d");e.clearRect(0,0,a,r);for(var c=function(){for(var e=[],t=0;t<L.length;t++){var n=L[t],a=new D.OffscreenCanvas(20,20),r=a.getContext("2d");if(n>=60){var i=Math.floor(256*Math.random()),o=Math.floor(256*Math.random()),c=Math.floor(256*Math.random());r.save(),r.beginPath(),r.fillStyle="rgb(".concat(i,",").concat(o,",").concat(c,")"),r.arc(10,10,10,0,2*Math.PI),r.stroke(),r.fill(),r.restore()}else{$(r,Q(10,10,10,n))}e.push(a)}return e}(),s=0;s<G;s++){var l=c[Math.floor(Math.random()*L.length)],u=Math.random()*a,h=Math.random()*r;o.drawImage(l,u,h)}e.drawImage(i,0,0),e.restore();var f=requestAnimationFrame((function(){return Z(e,t,n)}));n({newRafId:f,upDateTime:performance.now()})}function Q(e,t,n){for(var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,r=[],i=2*Math.PI/a,o=0;o<a;o++){var c=i*o,s=e+n*Math.cos(c),l=t+n*Math.sin(c);r.push([s,l])}return r}function $(e,t){var n=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),r=Math.floor(256*Math.random());e.save(),e.beginPath(),e.moveTo(t[0][0],t[0][1]);for(var i=1;i<t.length;i++)e.lineTo(t[i][0],t[i][1]);e.closePath(),e.fillStyle="rgb(".concat(n,",").concat(a,",").concat(r,")"),e.fill(),e.restore()}var ee=function(){var e=Object(a.useRef)(null),t=Object(a.useRef)(null),n=Object(a.useRef)(null),r=Object(a.useState)(!0),i=Object(o.a)(r,2),c=i[0],s=i[1],l=Object(a.useRef)(),u=[],h={eyeBallX:480,eyeBallY:230},d=Object(a.useContext)(x),v=d.state,y=d.dispatch;Object(a.useEffect)((function(){if(t.current){var a=e.current.getBoundingClientRect(),r=a.width,i=a.height;t.current.width=r,t.current.height=i,n.current.width=r,n.current.height=i}}),[]),Object(a.useEffect)((function(){if(v.drawType&&"0"!==v.drawType){var e=t.current,a=e.getContext("2d"),r=v.drawType,i=v.fillColor,o=v.strokeColor,c=v.lineW,f=v.lineType,d=v.shadowBlur,x=v.shadowOffsetX,y=v.shadowOffsetY,b=v.shadowColor,g=v.scale,w=v.rotate,_=v.opacity,z=v.textInput,M=v.imgUrl,R=v.sliceX,A=v.sliceY,I=v.originX,B=v.originY,E=v.fontSize,X=v.textAlign,Y=v.textBaseline,N=v.textDir,L=.02*g,D=3.6*w*(Math.PI/180),W=.01*_;switch(cancelAnimationFrame(l.current||0),a.clearRect(0,0,e.width,e.height),e.onclick=null,e.onmousedown=null,e.onmousemove=null,e.onmouseup=null,e.removeEventListener("mousemove",S),e.addEventListener("mouseleave",(function(){e.removeEventListener("mousemove",S)})),n.current.onclick=null,s(!0),a.save(),a.globalAlpha=W,a.shadowColor=b,a.shadowBlur=d,a.shadowOffsetX=x,a.shadowOffsetY=y,a.fillStyle=i,a.strokeStyle=o,a.lineWidth=0===c?1:c,"dash"===f?(a.setLineDash([3]),a.lineDashOffset=0):a.setLineDash([]),a.translate(e.width/2,e.height/2),a.scale(L,L),a.rotate(D),r){case"reset":a.rotate(Math.PI/180*-D),a.translate(-e.width/2,-e.height/2),a.clearRect(0,0,e.width,e.height);break;case"1":p(a);break;case"2":j(a);break;case"3":m(a);break;case"4":O(a,z,E,X,Y,N);break;case"5":a.restore(),e.removeEventListener("mousemove",S),e.addEventListener("mousemove",S),T(a,h.eyeBallX,h.eyeBallY);break;case"8":P(a);break;case"9":k(a);break;case"10":C(a,e,L,D,M,R,A,I,B);break;case"11":F(a,e);break;case"12":K(a,e,(function(e){var t=e.newRafId;l.current=t}));break;default:u=[],s(!1)}a.restore()}}),[v]),Object(a.useEffect)((function(){if(v.drawType){var e=t.current,n=e.getContext("2d");"0"===v.drawType&&(n.clearRect(0,0,e.width,e.height),R(n,e,v,"",(function(e,t){y({type:"changeRect",data:e}),t&&"rotate"in t&&"number"===typeof t.rotate&&y({type:"changeState",data:t})})))}}),[v.drawType]),Object(a.useEffect)((function(){if(v.drawType){var e=t.current,n=e.getContext("2d");"0"===v.drawType&&R(n,e,v,"rotate",(function(e,t){y({type:"changeRect",data:e}),t&&"rotate"in t&&"number"===typeof t.rotate&&y({type:"changeState",data:t})}))}}),[v.rotate]),Object(a.useEffect)((function(){var e=v.drawType;if(!c){var t=n.current.getContext("webgl");switch(t.clear(t.COLOR_BUFFER_BIT),e){case"6":t.clear(t.COLOR_BUFFER_BIT),z(t);break;case"7":t.clear(t.COLOR_BUFFER_BIT),n.current.onclick=null,n.current.onclick=function(e){return M(e,t)}}}}),[c,v.drawType]);var b,p=function(e){e.beginPath(),e.moveTo(-50,-50),e.lineTo(-50,50),e.lineTo(50,50),e.closePath(),e.fill(),e.stroke()},j=function(e){e.beginPath(),e.moveTo(-50,0),e.lineTo(50,0),e.closePath(),e.fill(),e.stroke()},m=function(e){e.beginPath(),e.arc(0,0,50,0,2*Math.PI,!1),e.closePath(),e.fill(),e.stroke()},O=function(e,t,n,a,r,i){e.beginPath(),e.font="".concat(n,"px sans-serif"),e.direction=i,e.textAlign=a,e.textBaseline=r,e.fillText(t,-100,-Number(n)/2),e.closePath(),e.fill(),e.stroke()},P=function(e){e.beginPath(),e.moveTo(50,50),e.quadraticCurveTo(35,0,20,10),e.quadraticCurveTo(0,25,8,60),e.quadraticCurveTo(20,90,50,100),e.quadraticCurveTo(85,85,92,60),e.quadraticCurveTo(100,20,80,10),e.quadraticCurveTo(65,0,50,50),e.stroke(),e.fill()},k=function(e){e.beginPath(),e.moveTo(50,50),e.bezierCurveTo(35,10,10,30,10,40),e.bezierCurveTo(0,60,40,100,50,100),e.bezierCurveTo(60,100,100,60,90,40),e.bezierCurveTo(75,10,50,40,50,50),e.stroke(),e.fill()},C=function(e,t,n,a,r,i,o,c,s){var l=t.width,u=t.height;e.restore();var h=new Image;h.src=r,h.onload=function(){e.save(),e.clearRect(0,0,l,u);var t=400*n/2+c,r=400*n/2+s;e.translate(t,r),e.rotate(a),e.translate(-t,-r),e.drawImage(h,i,o,400*n,400*n,c,s,400*n,400*n),e.restore()}},S=function(e){var n=Object(f.a)({},h);b&&clearTimeout(b),b=setTimeout((function(){var a,r=t.current.getBoundingClientRect(),i=r.x,o=r.y,c=e.clientX-i,s=e.clientY-o,l=Math.sqrt(Math.pow(c-n.eyeBallX,2)+Math.pow(s-n.eyeBallY,2)),u=0,h=l/5,f=(c-n.eyeBallX)/h,d=(s-n.eyeBallY)/h;clearInterval(a),a=setInterval((function(){var e=n.eyeBallX,r=n.eyeBallY;u>=2&&clearInterval(a);var i=t.current.getContext("2d");n.eyeBallX+=f,n.eyeBallY+=d,e>=483?(n.eyeBallX=483,u++):e<=461&&(n.eyeBallX=461,u++),r>=241?(n.eyeBallY=241,u++):r<=199&&(n.eyeBallY=199,u++),T(i,n.eyeBallX,n.eyeBallY)}),30)}),100)},T=function(e,n,a){e.clearRect(0,0,t.current.width,t.current.height),e.shadowColor="rgba(0,0,0,0)",e.lineWidth=3,e.beginPath(),e.arc(500,300,150,.8*Math.PI,2.2*Math.PI),e.fillStyle="#00a0de",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.arc(500,324,110,.8*Math.PI,2.2*Math.PI),e.fillStyle="#fff",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.ellipse(472,220,40,30,.5*Math.PI,0,2*Math.PI),e.fillStyle="#fff",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.ellipse(532,220,40,30,2.5*Math.PI,0,2*Math.PI),e.fillStyle="#fff",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.arc(n,a,14,0,2*Math.PI),e.fillStyle="#000",e.fill(),e.stroke(),e.beginPath(),e.arc(n+5,a+5,5,0,2*Math.PI),e.fillStyle="#fff",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.lineWidth=5,e.arc(528,240,14,1.1*Math.PI,1.9*Math.PI),e.stroke(),e.lineWidth=3,e.beginPath(),e.arc(502,265,18,0,2*Math.PI),e.fillStyle="#e70010",e.fill(),e.closePath(),e.stroke(),e.beginPath(),e.moveTo(502,287),e.lineTo(502,366),e.closePath(),e.stroke(),e.beginPath(),e.arc(502,280,100,.2*Math.PI,.8*Math.PI),e.stroke(),e.beginPath(),e.moveTo(420,285),e.lineTo(480,295),e.stroke(),e.beginPath(),e.moveTo(420,305),e.lineTo(480,305),e.stroke(),e.beginPath(),e.moveTo(420,325),e.lineTo(480,315),e.stroke(),e.beginPath(),e.moveTo(524,295),e.lineTo(584,285),e.stroke(),e.beginPath(),e.moveTo(524,305),e.lineTo(584,305),e.stroke(),e.beginPath(),e.moveTo(524,315),e.lineTo(584,325),e.stroke(),e.beginPath(),e.lineCap="round",e.lineWidth=1,e.fillStyle="#e70010",e.moveTo(370,389),e.lineTo(630,389),e.lineTo(630,405),e.lineTo(370,405),e.fill(),e.closePath(),e.stroke()},z=function(e){var t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,"\n        void main(){\n            gl_Position  = vec4(0.0,0.0,1.0,1.0);\n            gl_PointSize  = 40.0;\n        }\n    "),e.compileShader(t);var n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,"\n        void main(){\n            gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n        }\n    "),e.compileShader(n);var a=e.createProgram();e.attachShader(a,t),e.attachShader(a,n),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1)},M=function(e,t){var a,r=n.current.getBoundingClientRect(),i=r.x,o=r.y,c=r.width,s=r.height,l=Number(2*((e.pageX-i)/c-.5)),h=Number(2*-((e.pageY-o)/s-.5)),f=t.createShader(t.VERTEX_SHADER);t.shaderSource(f,"\n        attribute vec2 a_position;\n        void main(){\n            gl_Position  = vec4(a_position,1.0,1.0);\n            gl_PointSize  = 40.0;\n        }\n    "),t.compileShader(f);var d=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(d,"\n        void main(){\n            gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n        }\n    "),t.compileShader(d);var v=t.createProgram();t.attachShader(v,f),t.attachShader(v,d),t.linkProgram(v),t.useProgram(v),(a=u).push.apply(a,[l,h]);var x=Object(w.a)(u),y=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,y),t.bufferData(t.ARRAY_BUFFER,new Float32Array(x),t.STATIC_DRAW);var b=t.getAttribLocation(v,"a_position");t.vertexAttribPointer(b,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(b),t.drawArrays(t.POINTS,0,x.length/2)};return Object(g.jsxs)("div",{ref:e,className:_.a.showPattern_wrap,children:[Object(g.jsx)("canvas",{ref:t}),Object(g.jsx)("canvas",{ref:n,className:_.a.webgl_canvas,style:{display:c?"none":"block"}})]})},te=[{key:"0",text:"\u7ed8\u5236\u77e9\u5f62"},{key:"1",text:"\u7ed8\u5236\u4e09\u89d2\u5f62"},{key:"2",text:"\u7ed8\u5236\u76f4\u7ebf"},{key:"3",text:"\u7ed8\u5236\u5706\u5f62"},{key:"4",text:"\u7ed8\u5236\u6587\u672c"},{key:"8",text:"\u4e8c\u6b21\u8d1d\u585e\u5c14\u66f2\u7ebf"},{key:"9",text:"\u4e09\u6b21\u8d1d\u585e\u5c14\u66f2\u7ebf"},{key:"10",text:"\u7ed8\u5236\u56fe\u7247"},{key:"5",text:"\u7ed8\u5236\u54c6\u5566A\u68a6"},{key:"11",text:"\u7ed8\u5236\u6811"},{key:"12",text:"\u6027\u80fd\u68c0\u6d4b"}];var ne=function(){var e=Object(a.useReducer)(v,d),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(g.jsx)(x.Provider,{value:{state:n,dispatch:r},children:Object(g.jsxs)("div",{className:s.a.app,children:[Object(g.jsxs)("section",{className:s.a.app_left,children:[Object(g.jsx)("h1",{className:s.a.left_title,children:"Canvas\u5b9e\u9a8c\u5ba4"}),Object(g.jsx)("ul",{className:s.a.menu_list,children:te.map((function(e){return Object(g.jsx)("li",{className:"".concat(s.a.menu_item," ").concat(e.key===n.drawType?s.a.menu_item_active:""),onClick:function(){return r({type:"changeState",data:{drawType:e.key}})},children:e.text},e.key)}))})]}),Object(g.jsxs)("section",{className:s.a.app_right,children:[Object(g.jsx)("div",{className:s.a.canvas_settings,children:Object(g.jsx)(m,{})}),Object(g.jsx)("div",{className:s.a.canvas_wrap,children:Object(g.jsx)(ee,{})})]})]})})};i.a.render(Object(g.jsx)(ne,{}),document.getElementById("root"))},4:function(e,t,n){e.exports={setting_wrap:"CanvasSetting_setting_wrap__3XjHu",title_wrap:"CanvasSetting_title_wrap__2uPIl",setting_title:"CanvasSetting_setting_title__qchkB",reset_btn:"CanvasSetting_reset_btn__2I2Wv",setting_main:"CanvasSetting_setting_main__1u97m",select_diy:"CanvasSetting_select_diy__2LHIH"}},5:function(e,t,n){e.exports={app:"App_app__1x3uo",app_left:"App_app_left__2Ruzl",left_title:"App_left_title__nH2Ue",menu_list:"App_menu_list__1Mvcp",menu_item:"App_menu_item__aIb5C",menu_item_active:"App_menu_item_active__ByxJO",app_right:"App_app_right__j65vA",canvas_settings:"App_canvas_settings__ZqK7P",canvas_wrap:"App_canvas_wrap__2xupN"}}},[[29,1,2]]]);
//# sourceMappingURL=main.bba19df1.chunk.js.map