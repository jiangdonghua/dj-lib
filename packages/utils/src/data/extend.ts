import { isPlainObject, isArray } from './basic'

// 对象扩展
export const extend = (function () {
  function extend(target: Record<string, any>, source: Record<string, any>, deep: boolean = false) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
            target[key] = {}
          }
          if (isArray(source[key]) && !isArray(target[key])) {
            target[key] = []
          }
          extend(target[key], source[key], deep)
        } else if (source[key] !== undefined) target[key] = source[key]
      }
    }
  }
  return function (target: boolean | Record<string, any>, ...args: any) {
    let deep: boolean
    if (typeof target === 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach((arg: Record<string, any>) => {
      extend(target as Record<string, any>, arg, deep)
    })
    return target as Record<string, any>
  }
})()
