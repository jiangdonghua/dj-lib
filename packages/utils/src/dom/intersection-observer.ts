import 'intersection-observer'
interface IntersectionObserverFns {
  fn: () => void
  duration: number
  timer: any
}

const handleObserver = (entries: IntersectionObserverEntry[]): void => {
  for (const entry of entries) {
    const listeners = (entry.target as IntersectionObserverElement)?.__intersectionObserverFns__ || []
    // 相交率，默认是相对于浏览器视窗
    if (entry.intersectionRatio > 0) {
      // 当前图片加载完之后需要去掉监听
      listeners.forEach((listener: IntersectionObserverFns) => {
        listener.timer = setTimeout(() => listener.fn(), listener.duration)
      })
    } else {
      listeners.forEach(listener => {
        clearTimeout(listener.timer)
      })
    }
  }
}

export interface IntersectionObserverElement extends HTMLElement {
  __intersectionObserverFns__: any[]
  __intersectionObserver__: IntersectionObserver
}

export const addIntersectionObserver = (el: IntersectionObserverElement, fn: any, duration: number) => {
  if (!el || !(el instanceof Element)) {
    return
  }
  if (!el.__intersectionObserverFns__) {
    el.__intersectionObserverFns__ = []
    el.__intersectionObserver__ = new IntersectionObserver(handleObserver)
    el.__intersectionObserver__.observe(el)
  }
  el.__intersectionObserverFns__.push({
    fn,
    duration,
    timer: null,
  })
}

export const removeIntersectionObserver = (el: IntersectionObserverElement, fn: any) => {
  if (!el || !el.__intersectionObserverFns__) {
    return
  }
  el.__intersectionObserverFns__.splice(el.__intersectionObserverFns__.indexOf(fn), 1)
  if (el.__intersectionObserverFns__.length === 0) {
    el.__intersectionObserver__.unobserve(el)
  }
}
