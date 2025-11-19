import { Ref, unref } from 'vue';

function getNodeName(element: HTMLElement) {
	return element ? element.nodeName.toLowerCase() : '';
}

function getParentNode(element: HTMLElement) {
	return element.parentNode;
}

function isScrollNode(element: HTMLElement) {
	const { overflow, overflowX, overflowY } = window.getComputedStyle(element);
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/**
 * getScrollParentNodes
 * @description 获取当前节点的所有为滚动节点的父节点
 * @param {HTMLElement} node 当前节点
 * @returns {HTMLElement[]}
 */
export function getScrollParentNodes(node: HTMLElement): HTMLElement[] {
	if (!getNodeName(node) || getNodeName(node) === 'body') {
		return [];
	}
	let parentNode = getParentNode(node) as HTMLElement,
		scrollParents = [],
		nodeName = getNodeName(parentNode);
	while (parentNode && nodeName && nodeName !== 'body') {
		if (isScrollNode(parentNode)) {
			// 如果父元素是滚动元素
			scrollParents.push(parentNode);
		}
		parentNode = getParentNode(parentNode) as HTMLElement;
		nodeName = getNodeName(parentNode);
	}
	return scrollParents;
}

/**
 * getScrollParentNode
 * @description 获取当前节点的第一个为滚动节点的父节点
 * @param {HTMLElement} node 当前节点
 * @returns {HTMLElement | Window}
 */
export function getScrollParentNode(node: HTMLElement): HTMLElement | Window {
	if (!getNodeName(node) || getNodeName(node) === 'body') {
		return window;
	}
	let parentNode = getParentNode(node) as HTMLElement,
		nodeName = getNodeName(parentNode);
	while (parentNode && nodeName && nodeName !== 'body') {
		if (isScrollNode(parentNode)) {
			// 如果父元素是滚动元素
			return parentNode;
		}
		parentNode = getParentNode(parentNode) as HTMLElement;
		nodeName = getNodeName(parentNode);
	}
	return window;
}

/**
 * hasRectContain
 * @description 判断当前节点是否包含在目标节点内
 * @param {HTMLElement} parentNode 目标元素
 * @param {HTMLElement} elm 当前节点
 * @returns {boolean}
 */
export function hasRectContain(parentNode: HTMLElement, elm: HTMLElement): boolean {
	const parentRect = parentNode.getBoundingClientRect();
	const elmRect = elm.getBoundingClientRect();

	return elmRect.top < parentRect.bottom && elmRect.bottom > parentRect.top && elmRect.right > parentRect.left && elmRect.left < parentRect.right;
}

/**
 * 是否隐藏状态
 * @param elementRef
 * @returns
 */
export function isHidden(elementRef: HTMLElement | Ref<HTMLElement | undefined>): boolean {
	const el = unref(elementRef);
	if (!el) {
		return false;
	}

	const style = window.getComputedStyle(el);
	const hidden = style.display === 'none';

	// offsetParent returns null in the following situations:
	// 1. The element or its parent element has the display property set to none.
	// 2. The element has the position property set to fixed
	const parentHidden = el.offsetParent === null && style.position !== 'fixed';

	return hidden || parentHidden;
}
