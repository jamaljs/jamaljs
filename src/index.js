import uniqid from './uniqid';

const tags = "a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,video,wbr,var".split(',');

const Jml = {};

Jml.create = function (selector, markup, debug = false) {
	this.body = window.document.querySelector(selector);
	this.body.innerHTML = null;

	const defaultHolder = document.createElement('div');
	defaultHolder.setAttribute('_id', `jml-container-${uniqid()}`);

	if (Array.isArray(markup)) 
		markup.map(node => defaultHolder.appendChild(node));
	else
		defaultHolder.appendChild(markup);

	const render = () => this.body.appendChild(defaultHolder);
	const clear = () => this.body.innerHTML = '';
	const getRef = id => this.body.querySelector(`[_id="${id}"]`);

	return {
		body: this.body,
		render,
		clear,
		getRef,
		markup
	};
}

Jml.processParameters = function (parameters = { attributes: {}, content: [] }) {
	const { attributes, content } = parameters;
	// If everything is correct
	if (typeof attributes === 'object' && Array.isArray(content)) 
		return { attrs: attributes, children: content };
	
	// If children given first and not given attrs 
	if (Array.isArray(attributes))
		return { attrs: {}, children: attributes };

	// If first parameter is (jSomething or text) and no attrs
	if (attributes instanceof HTMLElement || typeof attributes === 'string')
		return { attrs: {}, children: [attributes] };
	
	// If object of attrs and children(jSometing or string) passed
	if (typeof attributes === 'object' && (content instanceof HTMLElement || typeof content === 'string' || content instanceof Promise))
		return { attrs: attributes, children: [content] };

	if (typeof attributes === 'object' && content == undefined)
		return { attrs: attributes, children: [] };
	
	// If nothing passed
	return { attrs: {}, children: [] };
};

Jml.initialize = function (config = { customTags: [] }) {
	const { customTags } = config;

	if (customTags.length > 0) {
		customTags.forEach(customTag => tags.push((_ => {
			if (!_.includes('-')) return _;

			const parts = customTag.split('-').map(x => x.replace(/^./, fc => fc.toUpperCase()));
			return parts.join('');
		})(customTag)));
	}

	tags.forEach(tag => 
		window[`j${tag.replace(/^./, firstCharacter => firstCharacter.toUpperCase())}`] =
			(attributes, content, config = { debug: false, inspect: false, loading: null }) => {
				const { attrs, children } = this.processParameters({ attributes, content });

				const elementId = uniqid();
				const element = document.createElement(tag);
				element.setAttribute('_id', elementId);

				Object.keys(attrs).map(key => {
					// If given attribute is function
					// then create an event listener function and
					// add to element
					if (typeof attrs[key] === 'function') {
						const eventHandlerId = `jmlEventHandler_${key}${element.attributes['_id'].value}`;
						const onEventKey = key.replace(/^./, _ => '').replace('on', '').toLowerCase();
						window[eventHandlerId] = attrs[key];

						element.addEventListener(onEventKey, window[eventHandlerId]);
					} else {
						element.setAttribute(key, attrs[key]);
					}

				});

				children.forEach(
					child => {
						// if given children is a promise append child in then block

						if (child instanceof Promise) {
							const { loading } = config;
							// if custom loading element|text defined then append loading to the current element
							if (loading) {
								element.appendChild(typeof loading === 'string' ? document.createTextNode(loading) : loading);
							}

							child.then(context => {
								// get parent element
								const parentElement = window.document.querySelector(`[_id="${elementId}"]`);
								// remove loading if defined
								if (loading) {
									parentElement.removeChild(parentElement.firstChild);
								}
								// append promise context to parent element
								if (Array.isArray(context)) {
									context.forEach(promiseObject => {
										parentElement.appendChild(typeof promiseObject === 'string' ? document.createTextNode(promiseObject) : promiseObject)
									});
								} else {
									parentElement.appendChild(typeof context === 'string' ? document.createTextNode(context) : context);
								}
							});
						} else {
							// just append child regularly
							element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
						}
					}
				);

				if (config.debug) {
					console.group(`Element: ${tag}`);
					console.log('\tAttributes:', element.attributes);
					console.log('\tChildren:', element.children);
					console.groupEnd();
				}

				if (config.inspect) debugger;

				return element;
			}
	);
};

module.exports = Jml;