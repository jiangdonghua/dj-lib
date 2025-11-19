export function hasClass(elem: Element, cls: string) {
	elem = elem || {};
	return new RegExp('\\b' + cls + '\\b').test(elem.className);
}

export function addClass(elem: Element, cls: string) {
	elem = elem || {};
	hasClass(elem, cls) || (elem.className += ' ' + cls);
	elem.className = elem.className.trim();
}

export function removeClass(el: Element, str: string | string[]) {
	([] as string[]).concat(str).forEach((item: string) => {
		if (hasClass(el, item)) {
			const reg = new RegExp('\\b' + item + '\\b');
			el.className = el.className.replace(reg, '').trim();
		}
	});
}

export function getStyle(dom: any, attr: string) {
	if (dom.getCurrentStyle) {
		return dom.getCurrentStyle[attr];
	} else {
		return (window as any).getComputedStyle(dom, null)[attr];
	}
}
