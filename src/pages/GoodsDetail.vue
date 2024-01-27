<script setup lang="ts">
import BackBtn from 'components/BackBtn.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import http from 'src/utils/http';

import {useRouter} from 'vue-router';
import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';
const router = useRouter();
const store = useUserStore();
const test = ref(true);
const route = useRoute();
const num = ref(1);
const res = ref<goodsType>();
const $q = useQuasar();

interface goodsType {
  name: string;
  price: number;
  cover: string;
  detail: string;
}

onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get(`/goods/get_detail/${route.params.id}`)
    ]);
    res.value = response1.data.Data;
  } catch (error) {
    console.error(error);
  }
});
const handleClick = () => {
  $q.dialog({
    title: '购买提示',
    message: '是否确认购买？',
    cancel: true,
    persistent: false
  }).onOk(() => {
    $q.notify({message:'购买成功',color:'orange'})
  }).onCancel(() => {
    $q.notify({message:'购买取消',color:'red'})
  })
};

</script>
<template>
  <div>
    <back-btn/>
    <div v-if="res" style="width:100vw;height: 50vh;position:absolute;top:0;background-image:url(/others/bg.jpg);z-index: -1"></div>
    <div class="q-pa-lg" v-if="res&&store.token">
      <div class="text-center text-h5 q-mb-sm text-grey-8">商品详情</div>
      <q-img style="height: 30rem" class="shadow-7" :src="res.cover" />
      <div class="q-mt-lg text-h6">{{ res.name }}</div>
      <div class="text-h5 q-my-md">¥ {{ res.price }}</div>
      <div class="row justify-between">
      <div>类型 样式一 ></div>
      <div>数量
        <q-icon style="border: 1px solid black;border-radius: 100%" class="q-mx-sm bg-black text-white" @click="num++"
                name="add" />
         {{ num }}
        <q-icon style="border: 1px solid black;border-radius: 100%" class="q-mx-sm bg-black text-white" @click="num=num===0?num+1:1"
                name="remove" />
      </div>
      </div>
      <div class="q-ma-md text-grey-10">{{ res.detail }}</div>
      <div class="row justify-center q-mt-xl">
      <q-btn style="border-radius: 4rem;bottom:4.5rem" @click="handleClick" class="fixed q-px-xl bg-grey-5 text-white text-h6">立 即 购 买</q-btn>
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

  </div>
</template>
<style scoped lang="scss">

</style>
