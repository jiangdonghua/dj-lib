<template>
  <div :class="[`${prefix}input`, disabled ? `${prefix}input--disabled` : '', size ? `${prefix}input--${size}` : '']">
    <input
      ref="inputRef"
      :class="`${prefix}input__inner`"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNamespace } from '@dj-lib/utils'

// 定义Props
interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'small' | 'medium' | 'large'
  maxlength?: string | number
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  size: 'medium',
  maxlength: '',
})

// 使用useNamespace生成BEM类名
const namespaceResult = useNamespace('input')
const prefix = typeof namespaceResult === 'string' ? 'en-' : (namespaceResult as { prefix: string }).prefix

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur'])

const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 暴露focus方法
const focus = () => {
  inputRef.value?.focus()
}

// 暴露blur方法
const blur = () => {
  inputRef.value?.blur()
}

defineExpose({
  focus,
  blur,
})
</script>
