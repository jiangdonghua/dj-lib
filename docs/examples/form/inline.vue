<template>
  <en-form :inline="true" :model="form" class="demo-form-inline">
    <en-form-item label="用户名">
      <en-input v-model="form.username" placeholder="请输入用户名" />
    </en-form-item>
    <en-form-item label="状态">
      <en-select v-model="form.status" placeholder="请选择状态">
        <en-option label="启用" value="active" />
        <en-option label="禁用" value="inactive" />
      </en-select>
    </en-form-item>
    <en-form-item>
      <en-button type="primary" @click="onSubmit">查询</en-button>
    </en-form-item>
  </en-form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  status: '',
})

const onSubmit = () => {
  console.log('submit!', form)
}
</script>

<style>
.demo-form-inline .en-form-item {
  margin-right: 16px;
}
</style>
