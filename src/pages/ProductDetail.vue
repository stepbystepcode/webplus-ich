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
import axios from 'axios';
import {ref} from 'vue';

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
      axios.get<{
        Data: ClassData[]
      }>(`https://link.ichgo.cn/api/v1/produce/get_detail/${route.params.id}`, {headers: {Authorization: `Bearer ${store.token}`}}),
    ]);

    res.value = response1.data.Data;
    imgList.value = res.value.img.split('+')
  } catch (error) {
    console.error(error);
  }
})();
</script>

<template>
  <div v-if="store.token">
    <BackBtn/>
    <q-carousel
      animated
      swipeable
      v-model="slide"
      navigation
      infinite
      height="13rem"
      class="q-mb-md"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide v-for="(img,i) in imgList" :name="i" :key="i" :img-src="img"/>

    </q-carousel>
    <div class="q-ma-md">
      <article>
        <span class="text-h5">{{ res.name }}</span><br>
        <p class="text-h6"> {{ res.detail }}</p>
      </article>
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
