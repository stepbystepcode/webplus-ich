<template>
  <q-page class="column q-ma-md">
<!--    <div class="column">-->
<!--    <q-img src="/others/search-bar.png"></q-img>-->
<!--    <input v-model="text" />-->
<!--    </div>-->
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: contain;">
      <q-input borderless placeholder="搜索" class="q-pl-lg" style="width: 100%"></q-input>
    </q-field>
    <q-carousel
      animated
      swipeable
      v-model="slide"
      navigation
      infinite
      height="13rem"
      class="radius q-mb-md"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide v-for="i in 5" :name="i" :key="i" :img-src="`/carousel/${i}.jpg`"/>
    </q-carousel>
    <div class="btn-warp row justify-center q-gutter-lg">
      <div v-for="(btn,i) in btnGroup" :key="btn.title" class="column flex-center">
        <q-btn round style="background-color: #EBD3AC"  class="q-mb-sm flex-center"><img style="width:2.9em" :src="`/btn-group/${i+1}.png`" alt=""></q-btn>
        {{btn.title}}
      </div>
    </div>
    <div class="row flex-center q-my-sm">
      <q-img width="30%" src="/others/hr1.png" alt=""></q-img>
      <q-img width="30%" src="/others/hr2.png" alt=""></q-img>
      <q-img width="30%" src="/others/hr3.png" alt=""></q-img>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const text = ref('');
const slide = ref(1);
const autoplay = ref(true);
const btnGroup = [
  {
    'title':'走进非遗',
    'link':''
  },
  {
    'title':'非遗传承',
    'link':''
  },
  {
    'title':'VR体验',
    'link':''
  },
  {
    'title':'非遗学习',
    'link':''
  }
]

</script>
<style scoped lang="scss">
.btn-warp button {
  width: 3rem;
  height: 3rem;
  padding: .7rem;
}
</style>
