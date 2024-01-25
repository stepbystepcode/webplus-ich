<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { onMounted, ref } from 'vue';
import http from 'src/utils/http';
import BackBtn from 'components/BackBtn.vue';
import {useRouter} from 'vue-router'
const store = useUserStore();
const router = useRouter();
const res=ref();
const test=ref(true);
onMounted(async () => {
  try {
    const [response1] = await Promise.all([
      http.get('/history/get_list?page=1&size=10'),
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
    <span class="text-h5" style="position: absolute;top: 1rem;left:4rem">历史记录</span><br>
    <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
    <div class="row q-gutter-md q-mt-xl q-ml-md" v-if="res">
      <div v-for="_ in res" :key="_.id" class="column items-center" @click="router.push(`/product/${_['*produce'].id}`)">
        <img :src="_['*produce'].cover" :alt="_['*produce'].name" class="radius" style="width:5rem;height: 5rem">
        <span>{{_['*produce'].name}}</span>
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

</style>
