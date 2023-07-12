<script setup lang="ts">

</script>

<template>
<div class="column q-ma-md q-gutter-y-md">
  <q-input outlined type="textarea"></q-input>
  <q-uploader
    url="https://link.ichgo.cn/api/v1/upload/img/test"
    multiple
    flat
    square
    color="brown"
    bordered
    max-files="3"
  />
  <q-btn>发布</q-btn>
</div>
</template>

<style scoped lang="scss">

</style>
