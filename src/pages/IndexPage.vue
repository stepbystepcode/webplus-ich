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
      <div class="column flex-center">
        <q-btn round color="black" icon="my_location" class="q-mb-sm"></q-btn>
        走进非遗
      </div>
      <div class="column flex-center">
        <q-btn round color="black" icon="my_location" class="q-mb-sm"></q-btn>
        非遗传承
      </div>
      <div class="column flex-center">
        <q-btn round color="black" icon="my_location" class="q-mb-sm"></q-btn>
        VR体验
      </div>
      <div class="column flex-center">
        <q-btn round color="black" icon="my_location" class="q-mb-sm"></q-btn>
        非遗学习
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const text = ref('');
const slide = ref(1);
const autoplay = ref(true);

</script>
<style scoped lang="scss">
.btn-warp button {
  width: 3rem;
  height: 3rem;
  padding: .7rem;
}
</style>
