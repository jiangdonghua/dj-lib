/**
 * @description 十六进制转换成rgb
 * @param {String} colo 十六进制颜色
 * @param {number} opacity 透明度
 */
export const colorRgb = (colo: string, opacity: number = 1) => {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = colo.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    const colorChange = []
    for (let j = 1; j < 7; j += 2) {
      colorChange.push(parseInt('0x' + color.slice(j, j + 2)))
    }
    return 'rgba(' + colorChange.join(',') + ',' + opacity + ')'
  } else {
    return color
  }
}
