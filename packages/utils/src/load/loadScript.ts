/**
 * @description 动态加载js
 * @param id
 * @param url
 * @returns
 */
export const loadScript = (id: string, url: string) => {
	return new Promise((resolve, reject) => {
		let script = document.getElementById(id) as HTMLScriptElement;
		if (script) {
			resolve(true);
		} else {
			script = document.createElement('script');
			script.src = url;
			script.type = 'text/javascript';
			script.id = id;
			document.body.appendChild(script);
			script.onload = resolve;
			script.onerror = reject;
		}
	});
};
