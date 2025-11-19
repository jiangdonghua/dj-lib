import { raf } from '../bom/raf'
function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}
export interface ScrollToOptions {
  getContainer?: () => HTMLElement | Window | Document
  direction?: 'vertical' | 'horizontal'
  callback?(): void
  duration?: number
}

export function getContainerScroll(target: HTMLElement | Window | Document | null, top: boolean) {
  let result = 0
  const method = top ? 'scrollTop' : 'scrollLeft'
  if (target === window) {
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset']
  } else if (target instanceof Document) {
    result = target.documentElement[method]
  } else if (target) {
    result = (target as HTMLElement)[method]
  }
  if (target && target !== window && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement?.[method]
  }
  return result
}

export function scrollTo(y: number, options: ScrollToOptions) {
  const { getContainer = () => window, callback, duration = 300, direction = 'vertical' } = options
  // 滚动容器
  const container = getContainer()
  const isTop = direction === 'vertical'
  // 滚动距离
  const scrollNum = getContainerScroll(container, isTop)

  // 开始时间
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScroll = easeInOutCubic(time > duration ? duration : time, scrollNum, y, duration)
    if (direction === 'vertical') {
      if (container === window) {
        ;(container as Window).scrollTo(window.pageXOffset, nextScroll)
      } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
        ;(container as Document).documentElement.scrollTop = nextScroll
      } else {
        ;(container as HTMLElement).scrollTop = nextScroll
      }
    } else if (direction === 'horizontal') {
      if (container === window) {
        ;(container as Window).scrollTo(window.pageXOffset, nextScroll)
      } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
        ;(container as Document).documentElement.scrollLeft = nextScroll
      } else {
        ;(container as HTMLElement).scrollLeft = nextScroll
      }
    }
    if (time < duration) {
      raf(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  raf(frameFunc)
}
