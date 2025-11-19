<template>
  <div class="demo-input-basic">
    <en-input v-model="inputValue" placeholder="请输入内容" />
    <p>当前值: {{ inputValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EnInput } from '@dj-lib/web-ui'

const inputValue = ref('')
</script>

<style scoped>
.demo-input-basic {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}
</style>
