/**
 * fontSize
 * @description 根据屏幕尺寸，适配fontSize，主要用于mobile项目
 */
function setFontSize() {
	const width = Math.min(document.body.clientWidth, window.innerWidth);
	const height = Math.min(document.body.clientHeight, window.innerHeight);
	document.documentElement.style.fontSize = Math.min(width, height) / 7.5 + 'px';
}
export function fontSize() {
	setFontSize();
	window.addEventListener('resize', setFontSize);
}

/**
 * 获取html的fontsize
 * @returns
 */
export function getRootFontSize() {
	const doc = document.documentElement;
	const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;

	const rootFontSize = parseFloat(fontSize);

	return rootFontSize;
}
