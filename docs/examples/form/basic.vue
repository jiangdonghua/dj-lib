<template>
  <en-form :model="form" label-width="80px">
    <en-form-item label="用户名">
      <en-input v-model="form.username" placeholder="请输入用户名" />
    </en-form-item>
    <en-form-item label="密码">
      <en-input v-model="form.password" type="password" placeholder="请输入密码" />
    </en-form-item>
    <en-form-item>
      <en-button type="primary" @click="onSubmit">提交</en-button>
      <en-button>取消</en-button>
    </en-form-item>
  </en-form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: '',
})

const onSubmit = () => {
  console.log('submit!', form)
}
</script>
