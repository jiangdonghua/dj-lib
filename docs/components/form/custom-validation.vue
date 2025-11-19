<template>
  <en-form :model="form" :rules="rules" label-width="100px">
    <en-form-item label="密码" prop="password">
      <en-input v-model="form.password" type="password" placeholder="请输入密码" />
    </en-form-item>
    <en-form-item label="确认密码" prop="confirmPassword">
      <en-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
    </en-form-item>
    <en-form-item>
      <en-button type="primary" @click="onSubmit">提交</en-button>
    </en-form-item>
  </en-form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  password: '',
  confirmPassword: '',
})

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  password: [{ validator: validatePassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }],
}

const onSubmit = () => {
  console.log('submit!', form)
}
</script>
