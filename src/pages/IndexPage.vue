<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import HrLine from '../components/HrLine.vue'
import http from 'src/utils/http';

const router=useRouter();
const slide = ref(1);
const autoplay = ref(true);

const btnGroup = [
  {
    'title': '走进非遗',
    'link': ''
  },
  {
    'title': '非遗传承',
    'link': ''
  },
  {
    'title': 'VR体验',
    'link': ''
  },
  {
    'title': '非遗学习',
    'link': ''
  }
]
const load=ref(false);
let res=ref();
let search=ref();
interface SwiperData {
  id: number;
  img: string;
}

interface ClassData {
  id: number;
  // other properties
}

(async () => {
  try {
    const [response1, response2] = await Promise.all([
      http.get<{ Data: SwiperData[] }>('/swiper/get_list'),
      http.get<{ Data: ClassData[] }>('/class/get_list'),
    ]);

    res.value = response1.data.Data;
    search.value = response2.data.Data;
    load.value = true;
  } catch (error) {
    console.error(error);
  }
})();
</script>
<template>
  <q-page
    v-if="load"
  >

    <div class="column q-mx-md">
      <img class="full-width" style="position: absolute;left:0;top:0;z-index: -1" src="/others/home-bg.jpg" alt="">
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: contain;">
      <q-input @click="router.push('/search')" borderless placeholder="搜  索" class="q-px-xl" style="width: 100%"></q-input>
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
      <q-carousel-slide  v-for="i in res" :name="i.id" :key="i" :img-src="i.img"/>

    </q-carousel>
    <div class="btn-warp row justify-center q-gutter-lg">
      <div v-for="(btn,i) in btnGroup" :key="btn.title" class="column flex-center">
        <q-btn round style="background-color: #EBD3AC" class="q-mb-sm flex-center"><img style="width:2.9em"
                                                                                        :src="`/home/btn-group/${i+1}.png`"
                                                                                        alt=""></q-btn>
        {{ btn.title }}
      </div>
    </div>
    <HrLine/>
    <span class="text-h6 q-my-md">每日资讯></span>
    <q-card class="row justify-between">
      <div style="flex:1" class="q-pa-md">高水旺<br>64岁的国家级非物质文化遗产代表性继承人，中国艺术设计院副院长。</div>
      <q-img width="7rem" src="/others/gsw.png" alt=""></q-img>
    </q-card>
    <span class="text-h6 q-my-md">热门推荐></span></div>
    <div class="box-warp row no-wrap overflow-auto q-gutter-lg full-width">
      <div><img src="/others/gsw.png" alt=""><span>123123123</span></div>
      <div><img src="/others/gsw.png" alt=""><span>123123123</span></div>
      <div><img src="/others/gsw.png" alt=""><span>123123123</span></div>
    </div>
    <div class="column q-ma-md">
    <HrLine/>
    <span class="text-h6 q-my-md">更多精彩></span></div>
  </q-page>
</template>

<style scoped lang="scss">
.btn-warp button {
  width: 3rem;
  height: 3rem;
  padding: .7rem;
}

.box-warp {
  div {
    width: 8rem;
    img {
      width: inherit;
      border-radius: 1rem;
      box-shadow: #e6d3af 5px -5px 3px 0px;
    }
  }
}
</style>
