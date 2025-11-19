// 获取网址参数

export function getUrlParam(name: string, url = window.location.href) {
  const reg = /([^&?]*)=([^&]*)/gi
  const params: Record<string, string> = {}
  url.replace(reg, (_a: string, b: string, c: string): any => {
    params[b] = decodeURIComponent(c)
  })
  if (name) {
    return params[name]
  } else {
    return params
  }
}
