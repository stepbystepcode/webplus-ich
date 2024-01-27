<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import HrLine from '../components/HrLine.vue'
import http from 'src/utils/http';
import {news} from 'src/data';

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
//return today weekday number
const getNews = () => {
  const date = new Date();
  return news[date.getDay()%10];
}
const load=ref(false);
let res=ref();
let hot=ref();
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
      http.get<{ Data: ClassData[] }>('/hot'),
    ]);

    res.value = response1.data.Data;
    hot.value = response2.data.Data;
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
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: cover;">
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
    <q-card @click="router.push('/news')" class="row justify-between">
      <div style="flex:1" class="q-pa-md"><strong>{{getNews().title}}</strong><br/>{{getNews().summarize}}</div>
      <q-img width="7rem" :src="`https://link.ichgo.cn/api/v1/upload/img/${getNews().img}.`" alt=""></q-img>
    </q-card>
    <span class="text-h6 q-my-md">热门推荐></span></div>
    <div class="box-warp row no-wrap overflow-auto q-gutter-lg full-width">
      <div v-for="item in hot" :key="item.id" @click="router.push(`/product/${item.id}/`)"><img :src="item.cover" alt="item.name"><span>{{item.name}}</span></div>
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
      object-fit: fill;
      height: 5rem;
      border-radius: 1rem;
      box-shadow: #e6d3af 3px -3px 10px 1px;
    }
  }
}
</style>
