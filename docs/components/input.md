# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 基础用法

基础的输入框用法。

:::demo 使用 `v-model` 进行双向绑定，使用 `placeholder` 设置占位符
input/basic
:::

## 禁用状态

设置 `disabled` 属性来禁用输入框。

:::demo 使用 `disabled` 属性来禁用输入框
input/disabled
:::

## 尺寸

通过设置 `size` 属性来配置不同尺寸的输入框。

:::demo 使用 `size` 属性来设置尺寸，可选值：`small`、`medium`、`large`
input/size
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

## API

### Props

| 属性名      | 说明           | 类型                       | 默认值   |
| ----------- | -------------- | -------------------------- | -------- |
| modelValue  | 绑定值         | `string \| number`         | -        |
| type        | 输入框类型     | `string`                   | `text`   |
| placeholder | 输入框占位文本 | `string`                   | -        |
| disabled    | 是否禁用       | `boolean`                  | `false`  |
| readonly    | 是否只读       | `boolean`                  | `false`  |
| size        | 输入框尺寸     | `small \| medium \| large` | `medium` |
| maxlength   | 最大输入长度   | `string \| number`         | -        |

### Events

| 事件名 | 说明                 | 回调参数                      |
| ------ | -------------------- | ----------------------------- |
| input  | 输入时触发           | `(value: string) => void`     |
| change | 值改变时触发         | `(value: string) => void`     |
| focus  | 输入框获得焦点时触发 | `(event: FocusEvent) => void` |
| blur   | 输入框失去焦点时触发 | `(event: FocusEvent) => void` |

### Methods

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| focus  | 使输入框获得焦点 | -    |
| blur   | 使输入框失去焦点 | -    |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 输入框内容 |
