<script setup lang="ts">
import { computed, ref } from 'vue';
import {useRouter} from 'vue-router';
import SimpleGallery from '../components/MomentsGallery.vue';
import http from 'src/utils/http';
const router=useRouter();
const search=ref('');
const model = ref('moments')
const subscribe = ref(false);
const images = (imgList:Img[]|null) => imgList&&imgList.map(_=>(
    {
      largeURL:_.url,
      thumbnailURL:_.url+'?w=100',
      width: parseInt(_.width),
      height:parseInt(_.height),
    }
  )
)
const response = await http.get('/dynamic/get_list');
const list:Item[]=response.data.reverse().map((item:Item)=>({
    ...item,
    img:images(item.img)
}));
const filterList= computed(()=>(
    search.value?list.filter(_=>_.detail.includes(search.value)):list
))
interface Item{
  id:number;
  detail:string;
  img: Img[]|null;
  userId:number;
  userName:string;
  timestamp:string;
  comments:number;
  likes:number;
}
interface Img{
  url:string;
  width:string;
  height:string;
}

const btnGroup = [
  {
    title: '传承人互动',
    link: ''
  },
  {
    title: '铁画锻制',
    link: '/product/72'
  },
  {
    title: '唐三彩',
    link: '/product/74'
  },
  {
   title: '传统曲艺',
   link: '/class/4'
  }
]
</script>

<template>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <div class="q-pa-md row justify-between">
    <q-btn-toggle
      v-model="model"
      toggle-text-color="black"
      size="lg"
      flat dense
      :ripple="false"
      color="grey"
      :options="[
        {label: '动态', value: 'moments'},
        {label: '关注', value: 'focus'},
      ]"
    />
  <q-btn flat @click="router.push('/post')"><q-icon size="1.5em" name="add_circle"></q-icon></q-btn></div>
    <q-tab-panels v-model="model" animated class="bg-transparent">
      <q-tab-panel name="moments" v-if="list">
        <q-input style="max-width: 80vw;margin: -1rem auto 1rem" rounded outlined dense class="q-mb-md" bg-color="white" v-model="search" />
        <div class="btn-warp row justify-center q-gutter-lg">
          <div v-for="(btn,i) in btnGroup" :key="btn.title" class="column flex-center">
            <q-btn round style="background-color: #EBD3AC"  @click="router.push(btn.link)" class="q-mb-sm flex-center"><img style="width:3rem;border-radius: 50%"
                                                                                            :src="`/moments/btn-group/${i+1}.jpg`"
                                                                                            alt=""></q-btn>
            {{ btn.title }}
          </div>
        </div>
        <q-card class="q-mt-md q-pa-md radius row" style="flex:1" v-for="_ in filterList" :key="_.id">
          <q-avatar class="q-mr-sm"
                    style="border-radius: .2em;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)">
            <img src="/others/avatar.jpg" alt=""></q-avatar>
          <div class="column" style="flex:1">
            <div class="row justify-between">
              <div class="row items-center">
                <span>{{_.userName}}</span>
                <q-badge rounded class="q-mx-sm" color="orange" label="VIP"/>
               </div>
              <q-btn @click="subscribe=!subscribe" rounded dense flat class="q-px-sm justify-center items-center"
                     style="height: 5px;border:1px solid #886f65;color: #886f65">{{subscribe?'已关注':'+ 关注'}}
              </q-btn>
            </div>
            <span>{{_.timestamp.replace(/^(\d+)-(\d+)-(\d+).*/, '$2月$3日')}} 山西</span>
            <SimpleGallery class="q-my-sm" galleryID="my-test-gallery" :images="_.img" />
            <span>{{_.detail}}</span>
            <div class="row justify-end items-center q-gutter-x-sm">
              <q-icon name="o_chat"></q-icon>{{_.comments}}
              <q-icon name="o_thumb_up"></q-icon>{{_.likes}}
            </div>
          </div>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="focus">
        <div class="text-h6">关注</div>
      </q-tab-panel>
    </q-tab-panels>
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
.abc {
  display: flex;
  width: 100%;
  height: 150px;
}

.abc > div:first-child {
  flex-basis: 30%;
}

.abc > div:nth-child(2),
.abc > div:nth-child(3) {
  flex-basis: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
