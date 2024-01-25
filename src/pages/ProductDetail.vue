<script setup lang="ts">
import {useUserStore} from 'stores/user';
import BackBtn from 'components/BackBtn.vue';

const store = useUserStore();
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const slide = ref(1);
const autoplay = ref(true);
const test = ref(true);
import {ref} from 'vue';
import http from 'src/utils/http';

interface ClassData {
  id: number;
  name: string
  // other properties
}

const res = ref();
const imgList = ref();
(async () => {
  try {
    const [response1] = await Promise.all([
      http.get<{
        Data: ClassData[]
      }>(`/produce/get_detail/${route.params.id}`),
    ]);

    res.value = response1.data.Data;
    imgList.value = res.value.img.split('+')
  } catch (error) {
    console.error(error);
  }
})();
</script>

<template>
  <div v-if="store.token" class="flex justify-center items-start" style="height:calc(100vh - 60px);background-image:url(/others/bg.jpg)">
    <div class="bg-white flex justify-center q-my-lg q-mt-xl" style="width: 95vw;border-radius: 1rem">
    <BackBtn/>
    <q-carousel
      animated
      swipeable
      v-model="slide"
      navigation
      infinite
      style="width: 90vw;border-radius: 1rem"
      height="13rem"
      class="q-my-md"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide v-for="(img,i) in imgList" :name="i" :key="i" :img-src="img"/>

    </q-carousel>
    <div class="q-ma-md">
      <article v-if="res">
        <span class="text-h5" style="position: absolute;top: .5rem;left:4rem">{{ res.name }}</span><br>
        <span class="text-h5">简介</span><br>
        <p class="text-h6"> {{ res.detail }}</p>
      </article>
    </div>
    </div>
  </div>
  <div v-else>
    <q-dialog v-model="test" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person" color="primary" text-color="white"/>
          <span class="q-ml-sm">请登录</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="router.push('/')" flat label="返回主页面" color="primary" v-close-popup/>
          <q-btn @click="router.push('/login')" flat label="去登录" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped lang="scss">
p {
  text-indent: 2em;
}
</style>
