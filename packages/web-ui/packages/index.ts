export * from './components'

import * as components from './components'

// 创建默认导出，支持app.use()的用法
export default {
  install(app: any) {
    // 注册所有组件
    Object.keys(components).forEach(key => {
      const component = (components as any)[key]
      if (component && component.install) {
        app.use(component)
      }
    })
  },
}
