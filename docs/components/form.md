# Form 表单

用于数据录入、校验等操作。

## 基础用法

包含输入框、选择器、单选框、多选框等表单项的表单。

:::demo
form/basic
:::

## 行内表单

设置 `inline` 属性可以让表单域变为行内的表单域。

:::demo
form/inline
:::

## 对齐方式

通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部。

:::demo
form/label-position
:::

## 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo
form/validation
:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::demo
form/custom-validation
:::

## 属性

### Form 属性

| 属性名                    | 说明                                    | 类型      | 可选值                   | 默认值   |
| ------------------------- | --------------------------------------- | --------- | ------------------------ | -------- |
| `model`                   | 表单数据对象                            | `object`  | -                        | -        |
| `rules`                   | 表单验证规则                            | `object`  | -                        | -        |
| `inline`                  | 行内表单模式                            | `boolean` | -                        | `false`  |
| `label-position`          | 表单域标签的位置                        | `string`  | `left` / `right` / `top` | `right`  |
| `label-width`             | 表单域标签的宽度                        | `string`  | -                        | -        |
| `disabled`                | 是否禁用该表单内的所有组件              | `boolean` | -                        | `false`  |
| `validate-on-rule-change` | 是否在 rules 属性改变后立即触发一次验证 | `boolean` | -                        | `true`   |
| `hide-required-asterisk`  | 是否隐藏必填字段的标签旁边的红色星号    | `boolean` | -                        | `false`  |
| `show-message`            | 是否显示校验错误信息                    | `boolean` | -                        | `true`   |
| `inline-message`          | 是否以行内形式展示校验信息              | `boolean` | -                        | `false`  |
| `status-icon`             | 是否在输入框中显示校验结果反馈图标      | `boolean` | -                        | `false`  |
| `validate-trigger`        | 触发验证的方式                          | `string`  | `blur` / `change`        | `change` |

### FormItem 属性

| 属性名           | 说明                         | 类型      | 可选值                        | 默认值  |
| ---------------- | ---------------------------- | --------- | ----------------------------- | ------- |
| `prop`           | 表单域 model 字段            | `string`  | -                             | -       |
| `label`          | 标签文本                     | `string`  | -                             | -       |
| `label-width`    | 表单域标签的的宽度           | `string`  | -                             | -       |
| `required`       | 是否必填                     | `boolean` | -                             | `false` |
| `rules`          | 表单验证规则                 | `array`   | -                             | -       |
| `error`          | 表单域验证错误信息           | `string`  | -                             | -       |
| `show-message`   | 是否显示校验错误信息         | `boolean` | -                             | `true`  |
| `inline-message` | 是否以行内形式展示校验信息   | `boolean` | -                             | `false` |
| `size`           | 用于控制该表单域下组件的尺寸 | `string`  | `large` / `default` / `small` | -       |

## 方法

### Form 方法

| 方法名          | 说明                                                       | 参数                                                                |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `validate`      | 对整个表单进行校验的方法                                   | `(callback?: Function) => Promise<boolean>`                         |
| `validateField` | 对部分表单字段进行校验的方法                               | `(props: array \| string, callback?: Function) => Promise<boolean>` |
| `resetFields`   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | -                                                                   |
| `clearValidate` | 移除表单项的校验结果                                       | `(props?: array \| string) => void`                                 |

### FormItem 方法

| 方法名       | 说明                                                 | 参数 |
| ------------ | ---------------------------------------------------- | ---- |
| `resetField` | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -    |

## 事件

### Form 事件

| 事件名     | 说明                   | 参数                                                        |
| ---------- | ---------------------- | ----------------------------------------------------------- |
| `validate` | 任一表单项被校验后触发 | `(prop: string, isValid: boolean, message: string) => void` |
| `submit`   | 表单提交时触发         | `(model: object) => void`                                   |

### FormItem 事件

| 事件名     | 说明               | 参数                                          |
| ---------- | ------------------ | --------------------------------------------- |
| `validate` | 表单项被校验后触发 | `(isValid: boolean, message: string) => void` |

## 插槽

### Form 插槽

| 插槽名    | 说明     |
| --------- | -------- |
| `default` | 表单内容 |

### FormItem 插槽

| 插槽名    | 说明               |
| --------- | ------------------ |
| `default` | 表单控件内容       |
| `label`   | 自定义标签内容     |
| `error`   | 自定义错误信息内容 |
