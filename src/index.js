import uniqid from 'uniqid';

const tags = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,video,wbr".split(',');

const Jml = {};

Jml.create = function (selector, markup, debug = false) {
	this.body = window.document.querySelector(selector);

	const render = () => this.body.innerHTML = markup;
	const clear = () => this.body.innerHTML = '';

	return {
		body: this.body,
		render,
		clear
	};
}

Jml.initialize = ({ debug = false, customTags = [] }) => {
	if (debug) console.log('Jml debug mode is on 💚');

	if (customTags.length > 0) {
		customTags.forEach(customTag => tags.push((_ => {
			if (!_.includes('-')) return _;

			const parts = customTag.split('-').map(x => x.replace(/^./, fc => fc.toUpperCase()));
			return parts.join('');
		})(customTag)));
	}

	tags.forEach(tag => {
		window[`j${tag.replace(/^./, firstCharacter => firstCharacter.toUpperCase())}`] = (attrs, children) => {
			const parsedAttributes = Object.keys(attrs)
				.map(key => `${key}="${attrs[key]}"`)
				.join(' ');

			const parsedChildren = children.map(child => {
				if (typeof child === 'function') child;
				return `${child}`;
			}).join('\n');

			if (debug) {
				const debugChildren = window.document.createElement(tag);
				const refId = uniqid();

				debugChildren.innerHTML = `<${tag}${parsedAttributes ? ' ' + parsedAttributes : ''}>${parsedChildren}</${tag}>`;
				window[`${tag}_ref_${refId}`] = debugChildren;

				console.group(tag);
				console.log(`Element: ${tag} ->`);
				console.log('\tAttributes:', attrs);
				console.log('\tChildren:', window[`${tag}_ref_${refId}`]);
				console.groupEnd();
			}

			return `\n<${tag}${parsedAttributes ? ' ' + parsedAttributes : ''}>${parsedChildren}</${tag}>`;
		};
	});
};

module.exports = Jml;