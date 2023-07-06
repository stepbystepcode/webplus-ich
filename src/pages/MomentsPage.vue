<script setup lang="ts">
import {ref} from 'vue'

const model = ref('moments')
const btnGroup = [
  {
    'title': '传承人互动',
    'link': ''
  },
  {
    'title': '铁画锻制',
    'link': ''
  },
  {
    'title': '唐三彩',
    'link': ''
  },
  {
    'title': '传统曲艺',
    'link': ''
  }
]
</script>

<template>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <div class="q-pa-md">
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
    <q-tab-panels v-model="model" animated class="bg-transparent">
      <q-tab-panel name="moments">
        <q-input rounded outlined dense class="q-mb-md" bg-color="white"></q-input>
        <div class="btn-warp row justify-center q-gutter-lg">
          <div v-for="(btn,i) in btnGroup" :key="btn.title" class="column flex-center">
            <q-btn round style="background-color: #EBD3AC" class="q-mb-sm flex-center"><img style="width:2.9em"
                                                                                            :src="`/moments/btn-group/${i+1}.jpg`"
                                                                                            alt=""></q-btn>
            {{ btn.title }}
          </div>
        </div>
        <q-card class="q-mt-md q-pa-md radius row" style="flex:1">
          <q-avatar class="q-mr-sm"
                    style="border-radius: .2em;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)">
            <img src="/others/avatar.jpg" alt=""></q-avatar>
          <div class="column" style="flex:1">
            <div class="row justify-between">
              <div class="row items-center">
                <span>MARS</span>
                <q-badge rounded class="q-mx-sm" color="orange" label="VIP"/>
                <span>每日分享:</span></div>
              <q-btn rounded dense flat class="q-px-sm justify-center items-center"
                     style="height: 5px;border:1px solid #886f65;color: #886f65">+ 关注
              </q-btn>
            </div>
            <span>3月3日 山西</span>
            <div class="row q-my-md" style="height: 200px;gap:.5rem">
              <div class="bg-red col radius"></div>
              <div class="column col" style="gap:.5rem">
                <div class="bg-green col radius"></div>
                <div class="bg-yellow col radius"></div>
              </div>
            </div>
            <span>开始，我只是学会了扎染，后来我发现我多了一份生活。</span>
            <div class="row justify-end items-center q-gutter-x-sm">
              <q-icon name="o_repeat"></q-icon>{{16}}
              <q-icon name="o_chat"></q-icon>{{16}}
              <q-icon name="o_thumb_up"></q-icon>{{16}}
            </div>
          </div>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="focus">
        <div class="text-h6">关注</div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
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
