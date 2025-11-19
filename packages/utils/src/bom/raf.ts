// 检查是否在浏览器环境中
export const raf =
  typeof window !== 'undefined'
    ? window.requestAnimationFrame || ((fn: FrameRequestCallback) => setTimeout(fn, 16))
    : (fn: FrameRequestCallback) => setTimeout(fn, 16)
