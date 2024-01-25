<script setup>
import { onMounted, ref } from 'vue';
import http from '../utils/http';
const res=ref();
onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get('/history/get_list'),
    ]);
    res.value = response1.data.Data;
  } catch (error) {
    console.error(error);
  }
})

</script>
<template>
  <div v-if="res">
    {{res}}
  </div>
</template>
<style scoped lang="scss">

</style>
