"use strict";var tags="a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,video,wbr".split(",");tags.forEach(function(tag){window["j".concat(tag.replace(/^./,function(firstCharacter){return firstCharacter.toUpperCase()}))]=function(attrs,children){var parsedAttributes=Object.keys(attrs).map(function(key){return"".concat(key,"=\"").concat(attrs[key],"\"")}).join(" ");var parsedChildren=children.map(function(child){if(typeof child==="function")child;return"".concat(child)}).join("\n");return"\n<".concat(tag).concat(parsedAttributes?" "+parsedAttributes:"",">").concat(parsedChildren,"</").concat(tag,">")}});var Jml=function Jml(selector,markup){var _this=this;this.body=window.document.querySelector(selector);var render=function render(){return _this.body.innerHTML=markup};var clear=function clear(){return _this.body.innerHTML=""};return{body:this.body,render:render,clear:clear}};