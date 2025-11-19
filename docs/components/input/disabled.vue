<template>
  <div class="demo-input-disabled">
    <en-input v-model="inputValue1" placeholder="请输入内容" />
    <en-input v-model="inputValue2" placeholder="禁用状态" disabled />
    <en-input v-model="inputValue3" placeholder="只读状态" readonly />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EnInput } from '@dj-lib/web-ui'

const inputValue1 = ref('可编辑内容')
const inputValue2 = ref('禁用内容')
const inputValue3 = ref('只读内容')
</script>

<style scoped>
.demo-input-disabled {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}
</style>
