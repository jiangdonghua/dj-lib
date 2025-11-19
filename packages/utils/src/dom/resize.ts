import ResizeObserver from 'resize-observer-polyfill'

export type HTMLElementCustomized<T> = HTMLElement & T
export type ResizableElement = HTMLElementCustomized<{
  __resizeListeners__?: Array<(...args: unknown[]) => unknown>
  __ro__?: ResizeObserver
}>

const resizeFn = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const callbackList = (entry.target as ResizableElement).__resizeListeners__ || []
    if (callbackList.length > 0) {
      callbackList.forEach((fn: () => void) => fn())
    }
  }
}

export const addResizeListener = (elm: ResizableElement, fn: any) => {
  elm.__ro__ = new ResizeObserver(resizeFn)
  elm.__resizeListeners__ = elm.__resizeListeners__ || []
  elm.__resizeListeners__.push(fn)
  elm.__ro__.observe(elm)
}

export const removeResizeListener = (elm: ResizableElement, fn: any) => {
  if (!elm || !elm.__resizeListeners__) {
    return
  }
  elm.__resizeListeners__ = elm.__resizeListeners__ || []
  const index = elm.__resizeListeners__.indexOf(fn)
  if (index !== -1) {
    elm.__resizeListeners__.splice(index, 1)
  }
  if (elm.__resizeListeners__.length === 0) {
    elm.__ro__?.disconnect()
  }
}
