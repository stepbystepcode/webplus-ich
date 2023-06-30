<template>
  <q-page class="column q-ma-md">
    <q-input filled v-model="text"></q-input>

    <q-carousel
      animated
      swipeable
      v-model="slide"
      navigation
      infinite
      height="15rem"
      class="radius q-mb-md"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg"/>
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg"/>
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg"/>
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg"/>
    </q-carousel>
    <div class="btn-warp row justify-center q-gutter-lg">
      <div v-for="btn in btnGroup" :key="btn.title" class="column flex-center">
        <q-btn round style="background-color: #EBD3AC" :icon="btn.icon" class="q-mb-sm"></q-btn>
        {{btn.title}}
      </div>
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
    'icon':'my_location',
    'link':''
  },
  {
    'title':'非遗传承',
    'icon':'my_location',
    'link':''
  },
  {
    'title':'VR体验',
    'icon':'my_location',
    'link':''
  },
  {
    'title':'非遗学习',
    'icon':'my_location',
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
