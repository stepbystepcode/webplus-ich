<script setup lang="ts">

import BackBtn from 'components/BackBtn.vue';
import { news } from 'src/data';
const getNews = () => {
  const date = new Date();
  return news[date.getDay()%10];
}
</script>

<template>
  <back-btn/>
  <span class="text-h5" style="position: absolute;top: 1rem;left:4rem">{{getNews().title}}</span><br>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <div class="row q-gutter-md q-ma-lg">
    <q-card>
      <q-img width="100%" :src="`https://link.ichgo.cn/api/v1/upload/img/${getNews().img}.`" alt=""></q-img>
      <div class="q-pa-md text-h6">{{getNews().content}}</div>
    </q-card>
  </div>

</template>

<style scoped lang="scss">

</style>
