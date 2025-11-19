export function on(el: any, event: string, handler: (e: MouseEvent) => void, useCapture = false) {
  if (!el) {
    return
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, useCapture)
  } else {
    el['on' + event] = handler
  }
}

export function off(el: any, event: string, handler: (e: MouseEvent) => void, useCapture = false) {
  if (!el) {
    return
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, useCapture)
  } else {
    el['on' + event] = null
  }
}

export function once(el: HTMLElement, event: string, fn: EventListener, useCapture = false) {
  const listener = function (this: any, ...args: any) {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener, useCapture)
  }
  on(el, event, listener, useCapture)
}
