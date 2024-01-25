<script setup>
import { onMounted, ref } from 'vue';
import http from 'src/utils/http';
import BackBtn from 'components/BackBtn.vue';
import {useRouter} from 'vue-router'
import { useUserStore } from 'stores/user';
const router = useRouter();
const store = useUserStore();
const test = ref(true);
const res=ref();
onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get('/goods/get_list/1?page=1&size=10')
    ]);
    res.value = response1.data.Data;
  } catch (error) {
    console.error(error);
  }
})


</script>
<template>
  <div v-if="store.token">
    <back-btn/>
    <span class="text-h5" style="position: absolute;top: 1rem;left:4rem">购物车</span><br>
    <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
    <div class="row q-gutter-md q-ma-lg" v-if="res">
      <q-card @click="router.push(`/goods/${_.id}`)" v-for="_ in res[0].goodsList" :key="_.id" class="col" style="height: 12rem">
        <q-img :src="_.cover" style="height: 8rem"></q-img>
        <div class="q-pa-md">{{_.name}}<br>￥{{_.price}}</div>
      </q-card>
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

</style>
