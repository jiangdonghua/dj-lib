import { App, Plugin } from 'vue'
import * as components from './components'

// 默认组件前缀
const DEFAULT_PREFIX = 'en'

// 定义组件类型
export type Components = typeof components

// 插件安装函数
export function install(app: App, opts?: { prefix?: string }): void {
  // 确定使用的前缀
  const prefix = opts?.prefix !== undefined ? opts.prefix : DEFAULT_PREFIX

  // 注册所有组件
  Object.entries(components).forEach(([key, component]) => {
    // 直接注册组件（Vue 3组件通常是直接注册的）
    const componentName = `${prefix}${key}`
    app.component(componentName, component)
  })
}

// 定义插件对象类型
const WebUIPlugin: Plugin & { install: typeof install } & Components = {
  install,
  ...components,
} as Plugin & { install: typeof install } & Components

// 默认导出插件对象
export default WebUIPlugin

// 导出所有组件
export * from './components'
