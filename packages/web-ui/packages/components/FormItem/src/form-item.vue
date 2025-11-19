<template>
  <div :class="formItemClasses">
    <label v-if="label" :class="`${prefix}form-item__label`" :for="labelFor">
      {{ label }}
      <span v-if="required" :class="`${prefix}form-item__required`">*</span>
    </label>
    <div :class="`${prefix}form-item__content`">
      <slot />
      <div v-if="errorMessage" :class="`${prefix}form-item__error`">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@dj-lib/utils'

defineOptions({
  name: useNamespace('form-item').toString(),
})

interface Props {
  label?: string
  prop?: string
  required?: boolean
  rules?: any[]
  labelWidth?: string | number
  showMessage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  prop: '',
  required: false,
  rules: () => [],
  labelWidth: '',
  showMessage: true,
})

const emit = defineEmits<{
  validate: [isValid: boolean]
}>()

const namespaceResult = useNamespace('form-item')
const prefix = typeof namespaceResult === 'string' ? 'en-' : (namespaceResult as { prefix: string }).prefix

// 注入表单上下文
const formRules = inject<Record<string, any[]>>('formRules', {})
const formModel = inject<Record<string, any>>('formModel', {})

const errorMessage = ref('')
const isValidating = ref(false)

const labelFor = computed(() => {
  return props.prop || undefined
})

const formItemClasses = computed(() => [
  `${prefix}form-item`,
  {
    [`${prefix}form-item--required`]: props.required,
    [`${prefix}form-item--error`]: errorMessage.value,
    [`${prefix}form-item--validating`]: isValidating.value,
  },
])

// 验证规则
const getRules = computed(() => {
  const rules = props.rules || formRules[props.prop] || []
  if (props.required && !rules.some(rule => rule.required)) {
    rules.unshift({ required: true, message: `${props.label || props.prop}不能为空` })
  }
  return rules
})

// 验证方法
const validate = async () => {
  if (!props.prop) return true

  const value = formModel[props.prop]
  const rules = getRules.value

  if (!rules || rules.length === 0) return true

  isValidating.value = true
  errorMessage.value = ''

  try {
    for (const rule of rules) {
      if (rule.required && !value) {
        errorMessage.value = rule.message || `${props.label || props.prop}不能为空`
        emit('validate', false)
        return false
      }

      if (rule.min && value && value.length < rule.min) {
        errorMessage.value = rule.message || `${props.label || props.prop}长度不能少于${rule.min}个字符`
        emit('validate', false)
        return false
      }

      if (rule.max && value && value.length > rule.max) {
        errorMessage.value = rule.message || `${props.label || props.prop}长度不能超过${rule.max}个字符`
        emit('validate', false)
        return false
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        errorMessage.value = rule.message || `${props.label || props.prop}格式不正确`
        emit('validate', false)
        return false
      }

      if (rule.validator && typeof rule.validator === 'function') {
        const result = await rule.validator(value, formModel)
        if (result === false || typeof result === 'string') {
          errorMessage.value = typeof result === 'string' ? result : rule.message || '验证失败'
          emit('validate', false)
          return false
        }
      }
    }

    emit('validate', true)
    return true
  } finally {
    isValidating.value = false
  }
}

// 监听值变化
watch(
  () => formModel[props.prop],
  () => {
    if (errorMessage.value) {
      validate()
    }
  },
)

// 暴露验证方法
defineExpose({
  validate,
  resetField() {
    errorMessage.value = ''
  },
  clearValidate() {
    errorMessage.value = ''
  },
})
</script>
