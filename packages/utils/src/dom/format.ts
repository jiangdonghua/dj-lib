import { getRootFontSize } from './fontSize'

export function unitToPx(value: number | string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof window !== 'undefined') {
    if (value.includes('rem')) {
      return rem2px(value)
    }
  }

  return parseFloat(value)
}

/**
 * rem 转 px
 * @param value
 * @returns
 */
export function rem2px(value: string) {
  value = value.replace(/rem/g, '')
  return +value * getRootFontSize()
}
