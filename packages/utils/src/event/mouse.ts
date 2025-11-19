import { on, off } from '../index'
interface Options {
  container?: HTMLElement
  event: MouseEvent
  handleMove?(move: Move, event: MouseEvent): void
  handleUp?(move: Move, event: MouseEvent): void
}
interface Move {
  x: number
  y: number
}
export const mouseDown = function ({ container = document.documentElement, event, handleMove, handleUp }: Options) {
  const isTouchDevice = 'ontouchstart' in document.documentElement
  const moveEventName = isTouchDevice ? 'touchmove' : 'mousemove'
  const endEventName = isTouchDevice ? 'touchend' : 'mouseup'
  let eventData
  if (isTouchDevice) {
    eventData = (event as unknown as TouchEvent).touches[0]
  } else {
    eventData = event
  }
  event.preventDefault()
  if (event.button && event.button !== 0) {
    return
  }
  const start = {
    x: eventData.clientX,
    y: eventData.clientY,
  }
  let timer: any = null
  const mousemove = function (e: MouseEvent) {
    let _eventData
    if (isTouchDevice) {
      _eventData = (e as unknown as TouchEvent).touches[0]
    } else {
      _eventData = e
    }
    const move: Move = {
      x: _eventData.clientX - start.x,
      y: _eventData.clientY - start.y,
    }
    if (typeof handleMove === 'function') {
      if (window.requestAnimationFrame) {
        timer = window.requestAnimationFrame(() => {
          handleMove(move, e)
        })
      } else {
        timer = setTimeout(() => {
          handleMove(move, e)
        }, 20)
      }
    }
  }
  const mouseup = function (e: MouseEvent) {
    let _eventData
    if (isTouchDevice) {
      _eventData = (event as unknown as TouchEvent).touches[0]
    } else {
      _eventData = event
    }
    const move: Move = {
      x: _eventData.clientX - start.x,
      y: _eventData.clientY - start.y,
    }
    if (window.cancelAnimationFrame) {
      window.cancelAnimationFrame(timer)
    } else {
      clearTimeout(timer)
    }
    if (typeof handleUp === 'function') {
      handleUp(move, e)
    }

    off(container, moveEventName, mousemove)
    off(document, endEventName, mouseup)
  }

  on(container, moveEventName, mousemove)
  on(document, endEventName, mouseup)
}
