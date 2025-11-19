import { createApp, h, Component } from 'vue'
import { getStyle } from '../dom'

export * from './data'

export * from './component.d'

// 默认组件命名空间
let ComponentName = 'en'

// 设置自定义组件命名空间的函数
export function setComponentNamespace(namespace: string) {
  ComponentName = namespace
}

// 获取当前组件命名空间
export function getComponentNamespace() {
  return ComponentName
}

/**
 *
 * useNamespace
 * @export
 * @description 设置组件名称或样式class名称
 * @param {string} name
 * @param {string} ...arg
 * @return {string | { className: string, prefix: string, toString: () => string }}
 */
export function useNamespace(
  name: number | string,
  ...arg: string[]
): string | { name: string; prefix: string; toString: () => string } {
  if (arg.length > 0) {
    name = ComponentName + '-' + name + '_' + arg.join('_')
  } else {
    name = ComponentName + '-' + name
  }
  return {
    name,
    prefix: ComponentName + '-',
    toString() {
      return name
    },
  }
}

/**
 * getNextIndex
 * @description 设置z-index
 * @param {*} now
 * @param {*} ladder
 * @returns
 */
let max = 2000
export function getNextIndex(ladder = 10): number {
  max = max + ladder
  document.querySelectorAll('body > *').forEach(dom => {
    const zIndex = Number(getStyle(dom, 'z-index'))
    if (zIndex > 0) {
      max = Math.max(max, zIndex)
    }
  })
  return max
}

/**
 * @description 是否是node节点
 * @param node
 * @returns
 */
export function isVNode(node: unknown) {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, '__v_isVNode')
}

export function registerComponent(fn: any, callback?: (app: any) => void) {
  fn.install = (app: any) => {
    console.log('registerComponent', fn.name)
    app.component(fn.name, fn)
    if (callback) {
      callback(app)
    }
  }
  return fn
}

export function registerComponentFn(fn: any, name: string, callback?: (app: any) => void) {
  fn.install = (app: any) => {
    app.config.globalProperties[name] = fn
    if (callback) {
      callback(app)
    }
  }
  return fn
}

// mount functional component
export function mount(Component: Component, props?: Record<string, any>) {
  const container = document.createElement('div')

  // Vue 3中使用createApp来创建应用实例
  const app = createApp({
    render() {
      // 在Vue 3中，props直接作为组件的属性传递
      return h(Component, props || {})
    },
  })

  const instance = app.mount(container)

  document.body.appendChild(container)

  return instance
}

export function appendChild(child: Element, id: string = useNamespace('container').toString()) {
  if (!child) {
    return
  }
  let element = document.querySelector('#' + id)
  if (!element) {
    element = document.createElement('div')
    element.id = id
    document.body.appendChild(element)
  }
  element.appendChild(child)
}

export function removeChild(child?: Element) {
  if (child && child.parentNode) {
    child.parentNode.removeChild(child)
  }
}
