// 正则表达式

export const mobile = /^1[123456789][0-9]{9}$/;
export const mobile2 = /^[123456789][0-9]{7}$/;
export const mobile3 = /^[123456789][0-9]{9}$/;
export const email = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;
export const money = /^[0-9]+.?[0-9]{0,2}$/;
export const number = /^\d*$/;
export const areaMobile = /^\d{1,4}-\d{7,11}$/;
export const idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
export const specialCharacters = /['"#$%！@@&;——,￥?？!~^'、+`=\\^*<>]/;
export const enCharacters = /^[a-zA-Z]/;
export const nan = /\D/g;
export const strNmb = /[^A-Za-z0-9]/g;
export const ipNmb = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
export const site = /^((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?)$/;
export const defaultDecimal = /([0-9]+.[0-9]{2})[0-9]*/;
export const emoji =
	/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
export const numStringUnderline = /[^A-Za-z0-9_]/g;
export default {
	mobile,
	mobile2,
	mobile3,
	email,
	money,
	number,
	idCard,
	specialCharacters,
	enCharacters,
	nan,
	strNmb,
	ipNmb,
	site,
	defaultDecimal,
	emoji,
	numStringUnderline,
	areaMobile,
};
