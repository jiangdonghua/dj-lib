/**
 * px2rem
 * @description 解决无法将行内样式的px转成rem
 */

export function px2rem(px: string, postcssRootValue: number = 50) {
  if (/%/gi.test(px)) {
    return px
  } else {
    return parseFloat(px) / postcssRootValue + 'rem'
  }
}
