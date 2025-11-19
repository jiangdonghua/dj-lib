export interface CookieOptions {
	name: string;
	value: string | number;
	expires: number;
	path: string;
}
// 获取cookie
export function getCookie(name: string) {
	const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
	const arr = document.cookie.match(reg);
	if (arr) {
		return decodeURIComponent(arr[2]);
	} else {
		return null;
	}
}

// 设置cookies
export function setCookie({ name, value, expires = 3000, path = '/' }: CookieOptions) {
	const exp = new Date();
	exp.setTime(exp.getTime() + expires * 1000);
	document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=' + path;
}
