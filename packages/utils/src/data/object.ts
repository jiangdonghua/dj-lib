import { extend } from './extend'
/**
 * @description 对象操作-根据属性值删除属性
 * @param {Record<string, any>} sourceObj 个人签名id
 * @param {[]} value 个人签名id
 * @returns { Record<string, any>} 新的对象
 */
export const filterObject = (sourceObj: Record<string, any>, arr: any) => {
  const obj = extend({}, sourceObj)
  const list: any[] = [].concat(arr)
  for (const key in obj) {
    if (list.includes(obj[key])) {
      delete obj[key]
    }
  }
  return obj
}
/**
 * @description 根据字段列表浅拷贝对象
 * @param data 原始数据
 * @param fields 字段列表
 * @param boo 默认false，标识按照排除字段进行拷贝，反之则只拷贝列表里的字段属性
 * @returns
 */
export function assign(data: object, fields: string[] = [], boo: boolean) {
  const result: any = {}
  const hasKey = (key: string) => {
    if (fields.length === 0) {
      return true
    }
    if (boo) {
      // includes 包含字段
      return fields.includes(key)
    } else {
      // ignore 排除字段
      return !fields.includes(key)
    }
  }
  Object.entries(data).forEach(([key, value]) => {
    if (hasKey(key)) {
      result[key] = value
    }
  })
  return result
}
