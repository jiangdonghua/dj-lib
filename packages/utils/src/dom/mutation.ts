// const mutationObserverFn = (mutationsList: any[], observer: any) => {
// 	for (const mutation of mutationsList) {
// 		if (mutation.type === 'childList') {
// 			console.log('A child node has been added or removed.', mutation);
// 		} else if (mutation.type === 'attributes') {
// 			console.log('The ' + mutation.attributeName + ' attribute was modified.', mutation);
// 		}
// 		console.log('observer', observer);
// 	}
// };

export const addMutationListener = (el: HTMLElement, config = {}, fn: any) => {
  const elm = el as any
  elm.__ob__ = new MutationObserver(fn)
  elm.__ob__.observe(elm, config)
}

export const removeMutationListener = (el: HTMLElement) => {
  const elm = el as any
  if (!elm || !elm.__mutationCallbacks__) {
    return
  }
  elm.__ob__.disconnect()
}
