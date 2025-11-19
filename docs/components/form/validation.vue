<template>
  <en-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px">
    <en-form-item label="用户名" prop="username">
      <en-input v-model="form.username" placeholder="请输入用户名" />
    </en-form-item>
    <en-form-item label="邮箱" prop="email">
      <en-input v-model="form.email" placeholder="请输入邮箱" />
    </en-form-item>
    <en-form-item label="年龄" prop="age">
      <en-input v-model.number="form.age" placeholder="请输入年龄" />
    </en-form-item>
    <en-form-item>
      <en-button type="primary" @click="submitForm">提交</en-button>
      <en-button @click="resetForm">重置</en-button>
    </en-form-item>
  </en-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const form = reactive({
  username: '',
  email: '',
  age: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 18, max: 100, message: '年龄必须在 18 到 100 之间', trigger: 'blur' },
  ],
}

const submitForm = () => {
  // 这里简化处理，实际需要实现完整的验证逻辑
  console.log('submit!', form)
}

const resetForm = () => {
  form.username = ''
  form.email = ''
  form.age = ''
}
</script>
