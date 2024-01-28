<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '../utils/http';
const res=ref();
import {useRouter} from 'vue-router'
const router = useRouter();
onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get('/goods/get_list/1?page=1&size=10')
    ]);
    res.value = response1.data.Data;
    console.log(res.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <q-header class="row flex-center text-h6 text-black bg-transparent" style="height: 3rem">文创商店</q-header>
  <div class="q-mx-md q-gutter-y-md">
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: contain;">
      <q-input borderless placeholder="搜  索" class="q-px-xl" style="width: 100%"></q-input>
    </q-field>
    <span class="text-h5">新品推荐</span>
    <div class="row q-gutter-md" v-if="res">
      <q-card @click="router.push(`/goods/${_.id}`)" v-for="_ in res[0].goodsList" :key="_.id" class="col" style="height: 12rem">
        <q-img :src="`${_.cover}?w=200`" style="height: 8rem"></q-img>
        <div class="q-pa-md">{{_.name}}<br>￥{{_.price}}</div>
      </q-card>
    </div>
    <div class="row">
      <q-card @click="router.push('/shop/2')" class="col row justify-between" style="height: 8rem">
        <div class="q-pa-sm column justify-center q-ml-md ">
          <div class="text-h6">书籍</div>
          <div class="text-grey">Book</div>
        </div>
        <q-img src="/shop/new/3.jpg" width="10rem" height="8rem"></q-img>
      </q-card>

    </div>
    <div class="row q-gutter-x-md">
      <q-card  @click="router.push('/shop/3')" class="col" height="13rem">
        <q-img src="/shop/new/4.jpg" height="9rem"></q-img>
        <div class="text-h6 q-pa-md">字画</div>

      </q-card>
      <q-card  @click="router.push('/shop/4')" class="col" height="13rem">
        <q-img src="/shop/new/5.jpg" height="9rem"></q-img>
        <div class="text-h6 q-pa-md">工艺品</div>

      </q-card>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
