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
  name: useNamespace('button').toString(),
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
