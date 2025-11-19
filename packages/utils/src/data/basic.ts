/**
 * getType
 * @description 获取object类型
 * @param {any} obj 传入的值
 * @returns {string} 返回类型
 */
export function getType(obj: any): string {
  const type: Record<string, string> = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object String]': 'string',
  }

  if (obj === null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj
}
/**
 * isArray
 * @description 判断是否为数组
 * @param {any} arr 传参
 * @returns {boolean}
 */
export function isArray(arr: any): boolean {
  return Object.prototype.toString.call(arr).indexOf('Array') !== -1
}

/**
 * isWindow
 * @description 是否为window对象
 * @param {any} obj 传参
 * @returns {boolean}
 */
export function isWindow(obj: any): boolean {
  return obj !== null && obj === obj.window
}

/**
 * isPlainObject
 * @description 是否为纯粹对象
 * @param {any} obj 传参
 * @returns {boolean}
 */
export function isPlainObject(obj: any): boolean {
  return getType(obj) === 'object' && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * isEmpty
 * @description 判空
 * @param {any} value
 * @return {boolean}
 */
export function isEmpty(value: any): boolean {
  if (typeof value === 'undefined' || value === null) {
    return true
  } else if (typeof value === 'number') {
    return false
  } else if (Array.isArray(value)) {
    return value.length === 0
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0
  } else {
    return !value
  }
}

export function isEmptyVersion1(value: any) {
  const mapTag = '[object Map]'
  const setTag = '[object Set]'
  if (typeof value === 'undefined' || value === null) {
    return true
  }
  if (typeof value === 'number') {
    return false
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  const tag = getTag(value)
  if (tag === mapTag || tag === setTag) {
    return !value.size
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return !value
}

//判断是否是对象
function isObject(obj: object) {
  return typeof obj === 'object' && obj !== null
}
/**
 * @description 判同
 * @param value,other
 * @returns {boolean}
 */
export function isEqual(value: any, other: any): boolean {
  if (!isObject(value) || !isObject(other)) {
    return value === other
  }
  if (value === other) {
    return true
  }
  if (Object.keys(value).length !== Object.keys(other).length) {
    return false
  }

  //递归比较
  for (const key in value) {
    const res = isEqual(value[key], other[key])
    if (!res) {
      return false
    }
  }
  return true
}

function getTag(value: any) {
  return Object.prototype.toString.call(value)
}

/**
 * @description 去除对象空值
 */
export function cleanEmpty(obj: any) {
  const o = JSON.parse(JSON.stringify(obj)) // 深拷贝
  Object.keys(o).forEach(key => {
    if (o[key] && typeof o[key] === 'object') {
      o[key] = cleanEmpty(o[key])
    }
    if (typeof o[key] === 'undefined' || o[key] === null || o[key] === '') {
      delete o[key]
    }
  })
  return o
}

/**
 * @description mm转换px
 */
export function mmToPx(mm: number) {
  return Math.floor((mm / 10) * 28.346)
}

/**
 * calculate
 * @description 浮点四则运算
 * @description 包含add、sub、multiplication、division
 */
export const calculate = (function () {
  function isInteger(obj: number): boolean {
    return Math.floor(obj) === obj
  }

  function toInteger(floatNum: number) {
    const ret = {
        times: 1,
        num: 0,
      },
      isNegative = floatNum < 0

    if (isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    } else {
      const strfi = floatNum + ''
      const dotPos = strfi.indexOf('.')
      const len = strfi.substr(dotPos + 1).length
      const times = Math.pow(10, len)
      const intNum = parseInt(String(Math.abs(floatNum) * times + 0.5), 10)

      ret.times = times

      if (isNegative) {
        ret.num = -intNum
      } else {
        ret.num = intNum
      }
      return ret
    }
  }

  function operation(a: number, b: number, op: string) {
    const o1 = toInteger(a)
    const o2 = toInteger(b)
    const n1 = o1.num
    const n2 = o2.num
    const t1 = o1.times
    const t2 = o2.times
    const max = t1 > t2 ? t1 : t2
    let result = null

    switch (op) {
      case 'add':
        if (t1 === t2) {
          // 两个小数位数相同
          result = n1 + n2
        } else if (t1 > t2) {
          // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2)
        } else {
          // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2
        }
        return result / max
      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) - n2
        }
        return result / max
      case 'multiplication':
        result = (n1 * n2) / (t1 * t2)
        return result
      case 'division':
        result = (n1 / n2) * (t2 / t1)
        return result
      default:
        return 0
    }
  }

  function multi(...arg: [Array<number>, string]): number {
    const type = arg[1]
    const arr = arg[0]
    if (arr.length === 1) {
      return arr[0]
    } else if (arr.length === 2) {
      return operation(arr[0], arr[1], type)
    } else if (arr.length > 2) {
      const a = arr.shift()
      const b = arr.shift()
      let c = operation(Number(a), Number(b), type)
      while (arr.length > 0) {
        c = operation(c, Number(arr.shift()), type)
      }
      return c
    }
    return 0
  }

  return {
    add(...arg: number[]) {
      return multi(arg, 'add')
    },
    sub(...arg: number[]) {
      return multi(arg, 'subtract')
    },
    multiplication(...arg: number[]) {
      return multi(arg, 'multiplication')
    },
    division(...arg: number[]) {
      return multi(arg, 'division')
    },
  }
})()

/**
 * @description 加强版：数字、特殊符号、小写字母、大写字母组合（必须有三种以上组合）
 * @param {any} regex 校验地址
 */
export const strongPassword = (regex: any) => {
  let count = 0 //满足的规则数量
  const digital = /[0-9]/ //数字正则
  const capital = /[A-Z]/ //大写字母正则
  const lowercase = /[a-z]/ //小写字母正则
  const spec = /[.@$!%*#_~?^]/ //特殊字符正则
  digital.test(regex) ? count++ : null
  capital.test(regex) ? count++ : null
  lowercase.test(regex) ? count++ : null
  spec.test(regex) ? count++ : null
  return count
}
/**
 * @description 比较值，获取范围内值
 * @param value 原始值
 * @param min 最小值
 * @param max 最大值
 */
export function clampRange(value: number, min: number, max: number) {
  if (min > max) {
    ;[max, min] = [min, max]
  }
  return Math.max(Math.min(value, max), min)
}
