<script setup>
import { onMounted, ref } from 'vue';
import http from 'src/utils/http';
import BackBtn from 'components/BackBtn.vue';
import {useRouter} from 'vue-router'
const router = useRouter();
const res=ref();
onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get(`/goods/get_list/${router.options.history.location.toString().slice(-1)}?page=1&size=10`)
    ]);
    res.value = response1.data.Data;
  } catch (error) {
    console.error(error);
  }
})
const title=()=>{
  const n=router.options.history.location.toString().slice(-1)
  switch (n) {
    case '2':
      return '书籍'
    case '3':
      return '字画'
    case '4':
      return '工艺品'
    default:
      return '文创商店'
  }
}

</script>
<template>
  <div v-if="res">
    <back-btn/>
    <span class="text-h5" style="position: absolute;top: 1rem;left:4rem">{{title()}}</span><br>
    <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
    <div class="row q-gutter-md q-ma-lg" v-if="res">
      <q-card @click="router.push(`/goods/${_.id}`)" v-for="_ in res[0].goodsList" :key="_.id" class="col" style="height: 12rem">
        <q-img :src="`${_.cover}?w=200`" style="height: 8rem"></q-img>
        <div class="q-pa-md">{{_.name}}<br>￥{{_.price}}</div>
      </q-card>
    </div>
  </div>
</template>
<style scoped lang="scss">

</style>
