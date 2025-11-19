<template>
  <div class="demo-input-size">
    <en-input v-model="inputValue1" placeholder="小尺寸" size="small" />
    <en-input v-model="inputValue2" placeholder="默认尺寸" size="medium" />
    <en-input v-model="inputValue3" placeholder="大尺寸" size="large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EnInput } from '@dj-lib/web-ui'

const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
</script>

<style scoped>
.demo-input-size {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
}
</style>
