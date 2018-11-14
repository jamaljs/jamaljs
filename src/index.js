/*const tags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1", "h2", "h3", "h4","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","video","wbr"];

for (let tag of tags) {
    eval(`function ${tag}(attrs, children) {
        return \`<${tag} \$\{Object.keys(attrs).map(function(x) {return \`\$\{x\}="\$\{attrs[x]\}" \`}).join('')\}>
            \$\{typeof children === 'function' ? children() : eval('\`\$\{children\}\`')\}
        </${tag}>\`;
    }`);
}

const jml = function (selector, markup) {
    const body = document.querySelector(selector);
    body.innerHTML = markup;
};
*/


const tags = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,video,wbr".split(',');

tags.forEach(tag => {
    window[`j${tag.replace(/^./, firstCharacter => firstCharacter.toUpperCase())}`] = (attrs, children) => {
        let parsedAttributes = Object.keys(attrs)
            .map(key => `${key}="${attrs[key]}"`)
            .join(' ');

        let parsedChildren = children.map(child => {
            if (typeof child === 'function') child;
            return `${child}`;
        }).join('\n');

        return `\n<${tag}${parsedAttributes ? ' ' + parsedAttributes : ''}>${parsedChildren}</${tag}>`;
    };
});

const Jml = function (selector, markup) {
    this.body = window.document.querySelector(selector);

    const render = () => this.body.innerHTML = markup;
    const clear = () => this.body.innerHTML = '';

    return {
        body: this.body,
        render,
        clear
    };
}