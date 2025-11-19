// 监听静态资源加载失败时，刷新当前页面
export function addListenerResource() {
  window.addEventListener(
    'error',
    (e: any) => {
      const curTime = new Date().getTime() // 当前时间戳
      const typeName = e.target.localName // 资源类型名称（script为js类，link为css类）
      const targetSrc = e.target.src // 资源src - 针对script
      const targetHref = e.target.href // 资源href - 针对css
      const host = window.location.host // 当前域名
      if ((typeName === 'script' && targetSrc.includes(host)) || (typeName === 'link' && targetHref.includes(host))) {
        // 判断js/css类静态资源加载失败 且 属于当前域名下的资源
        const preTime = Number(sessionStorage.getItem('refresh-time'))
        if (preTime && curTime - preTime < 10 * 60 * 1000) {
          // 10分钟之内不再次刷新
          return
        }
        sessionStorage.setItem('refresh-time', String(curTime))
        location.reload()
      }
    },
    true,
  )
}
