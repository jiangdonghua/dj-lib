<template>
  <form :class="formClasses" :autocomplete="props.autocomplete" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '@dj-lib/utils'

defineOptions({
  name: useNamespace('form').toString(),
})

interface Props {
  autocomplete?: string
  inline?: boolean
  labelPosition?: 'top' | 'left' | 'right'
  disabled?: boolean
  model?: Record<string, any>
  rules?: Record<string, any[]>
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'on',
  inline: false,
  labelPosition: 'right',
  disabled: false,
  model: () => ({}),
  rules: () => ({}),
})

const emit = defineEmits<{
  submit: [values: Record<string, any>]
  validate: [field: string, isValid: boolean]
}>()

const namespaceResult = useNamespace('form')
const prefix = typeof namespaceResult === 'string' ? 'en-' : (namespaceResult as { prefix: string }).prefix

const formClasses = computed(() => [
  `${prefix}form`,
  {
    [`${prefix}form--inline`]: props.inline,
    [`${prefix}form--label-${props.labelPosition}`]: props.labelPosition,
  },
])

const handleSubmit = () => {
  emit('submit', props.model)
}

// 提供表单上下文给子组件
provide('formDisabled', props.disabled)
provide('formRules', props.rules)
provide('formModel', props.model)
</script>
