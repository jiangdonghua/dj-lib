import { getType } from '../data'
import type { ComponentProps, ComponentPropsContent, ComponentEventContent, ComponentMethodContent } from './component'
/**
 * @description 转换props
 * @param data
 */
export function getProps(data: ComponentProps): ComponentProps {
  const map: ComponentProps = {}
  Object.entries(data).forEach(([key, value]) => {
    const { validator, values, ...args } = value
    map[key] = {
      ...args,
    }
    if (validator) {
      map[key]['validator'] = (value: any) => validator(value)
    } else if (values) {
      map[key]['validator'] = (value: any) => values.map(p => p.value === value)
    }
  })
  return map
}

export function getPropType(type: any): string[] {
  let arr: string[] = []
  if (type instanceof Function) {
    arr.push(getType(type()))
  } else if (type instanceof Array) {
    type.forEach(p => {
      arr = arr.concat(getPropType(p))
    })
  }
  return arr
}

/**
 * @description 将props转换为list
 * @param data
 * @returns
 */
export function getPropsList(data = {}) {
  if (!data) {
    return []
  }
  return Object.entries(data).map(([key, value]) => {
    const { type, values, ...args } = value as ComponentPropsContent
    return {
      ...args,
      default: typeof args.default === 'function' ? args.default() : args.default,
      name: key,
      type: getPropType(type).join('<br/>'),
      values: values?.map(p => p.value + ':' + p.description).join('<br/>'),
    }
  })
}

export function getEventsList(data = {}) {
  if (!data) {
    return []
  }
  return Object.entries(data).map(([key, value]) => {
    const { args, ...other } = value as ComponentEventContent
    return {
      name: key,
      ...other,
      args: args?.map(p => p.name + ': ' + p.description).join('<br/>'),
    }
  })
}

export function getMethodsList(data = {}) {
  if (!data) {
    return []
  }
  return Object.entries(data).map(([key, value]) => {
    const { args, returns, ...other } = value as ComponentMethodContent
    return {
      name: key,
      ...other,
      args: args?.map(p => p.name + ': ' + p.description).join('<br/>'),
      returns: returns?.map(p => p.name + ': ' + p.description).join('<br/>'),
    }
  })
}
