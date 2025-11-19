const fns: any[] = [];
const pushState = window.history.pushState;
window.history.pushState = function (...args) {
	if (fns.length > 0) {
		fns.forEach(fn => fn());
	}
	return pushState.call(this, ...args);
};
const replaceState = window.history.replaceState;
window.history.replaceState = function (...args) {
	if (fns.length > 0) {
		fns.forEach(fn => fn());
	}
	return replaceState.call(this, ...args);
};
window.addEventListener('popstate', () => {
	if (fns.length > 0) {
		fns.forEach(fn => fn());
	}
});
export const addHistoryListener = (fn: any) => {
	fns.push(fn);
};
export const removeHistoryListener = (fn: any) => {
	fns.splice(fns.indexOf(fn), 1);
};
