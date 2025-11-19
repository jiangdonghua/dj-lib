# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`size`、`tip`、`icon` 和 `placement` 属性来定义 Button 的样式
button/basic
:::

## 默认导入方式

你也可以使用默认导入方式来使用组件库：

```js
import WebUI from '@dj-lib/web-ui'
```

然后在 Vue 应用中注册，prefix 参数是可选的：

```js
// 使用自定义前缀
app.use(WebUI, { prefix: 'En' })

// 或者使用默认前缀（'en'）
app.use(WebUI)
```

### 使用自定义前缀（En）

:::

### 使用默认前缀（en）

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
| -      | -    | -    | -      |

### Events

| 事件名 | 说明           | 回调参数                      |
| ------ | -------------- | ----------------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
