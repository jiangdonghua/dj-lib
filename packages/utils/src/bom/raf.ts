export const raf = window.requestAnimationFrame || (fn => setTimeout(fn, 16));
