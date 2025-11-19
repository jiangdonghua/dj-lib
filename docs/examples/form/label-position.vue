<template>
  <div>
    <div style="margin-bottom: 20px">
      <span style="margin-right: 16px">标签位置：</span>
      <en-radio-group v-model="labelPosition">
        <en-radio label="left">左对齐</en-radio>
        <en-radio label="right">右对齐</en-radio>
        <en-radio label="top">顶部对齐</en-radio>
      </en-radio-group>
    </div>
    <en-form :label-position="labelPosition" :model="form" label-width="80px">
      <en-form-item label="用户名">
        <en-input v-model="form.username" placeholder="请输入用户名" />
      </en-form-item>
      <en-form-item label="邮箱">
        <en-input v-model="form.email" placeholder="请输入邮箱" />
      </en-form-item>
      <en-form-item label="描述">
        <en-input v-model="form.desc" type="textarea" placeholder="请输入描述" />
      </en-form-item>
      <en-form-item>
        <en-button type="primary" @click="onSubmit">提交</en-button>
        <en-button>取消</en-button>
      </en-form-item>
    </en-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const form = reactive({
  username: '',
  email: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!', form)
}
</script>
