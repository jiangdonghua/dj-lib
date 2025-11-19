<template>
  <button
    :class="[
      `${prefix}button`,
      type ? `${prefix}button--${type}` : '',
      disabled || loading ? `${prefix}button--disabled` : '',
      loading ? `${prefix}button--loading` : '',
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { APP_NAME } from '@dj-lib/shared'
import { useNamespace } from '@dj-lib/utils'

// 基本组件命名
defineOptions({
  name: useNamespace('button'),
})

// 定义Props
interface Props {
  type?: 'primary' | 'secondary' | 'danger' | 'warning'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  loading: false,
})

// 使用useNamespace生成BEM类名
const namespaceResult = useNamespace('button')
// 提取前缀，兼容新旧版本的useNamespace返回值
const prefix = typeof namespaceResult === 'string' ? 'en-' : (namespaceResult as { prefix: string }).prefix

// 在组件挂载时设置CSS变量
onMounted(() => {
  const root = document.documentElement
  root.style.setProperty('--component-namespace', prefix.replace('-', ''))
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    console.log(`${APP_NAME} button clicked`)
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
/* 定义组件基础样式 */
[class*='button'] {
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

/* 悬停效果 */
[class*='button']:hover:not([class*='button--disabled']):not([class*='button--loading']) {
  background-color: #000;
  color: #fff;
}

/* 主要按钮样式 */
[class*='button--primary'] {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

[class*='button--primary']:hover:not([class*='button--disabled']):not([class*='button--loading']) {
  background-color: #0056b3;
  border-color: #0056b3;
}

/* 次要按钮样式 */
[class*='button--secondary'] {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

[class*='button--secondary']:hover:not([class*='button--disabled']):not([class*='button--loading']) {
  background-color: #545b62;
  border-color: #545b62;
}

/* 危险按钮样式 */
[class*='button--danger'] {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

[class*='button--danger']:hover:not([class*='button--disabled']):not([class*='button--loading']) {
  background-color: #c82333;
  border-color: #c82333;
}

/* 警告按钮样式 */
[class*='button--warning'] {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

[class*='button--warning']:hover:not([class*='button--disabled']):not([class*='button--loading']) {
  background-color: #e0a800;
  border-color: #e0a800;
}

/* 禁用和加载状态样式 */
[class*='button--disabled'],
[class*='button--loading'] {
  cursor: not-allowed;
  opacity: 0.65;
}

/* 加载状态动画 */
[class*='button--loading'] {
  position: relative;
}

[class*='button--loading']::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-top: -8px;
  margin-left: -8px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
