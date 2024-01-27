<script setup lang="ts">
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
const route = useRoute();
const router = useRouter();
import { VueEternalLoading, LoadAction } from '@ts-pro/vue-eternal-loading';
import BackBtn from 'components/BackBtn.vue';
import http from 'src/utils/http';

const PAGE_SIZE = 5;

type Product = {
  id: string;
  produce:{
    name:string
  }
};

const list = ref<Product[]>([]);
let page = 1;

function loadProducts(page: number): Promise<Product[]> {
  return http.get(`/produce/get_list/${route.params.id}?size=${PAGE_SIZE}&page=${page}`)
    .then((res) => res.data.Data);
}

async function load({ loaded }: LoadAction): Promise<void> {
  const loadedProducts = await loadProducts(page);
  list.value.push(...loadedProducts);
  page += 1;
  loaded(loadedProducts.length, PAGE_SIZE);
}
</script>

<template>
  <BackBtn/>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <div class="q-ma-md q-mt-xl">
  <div v-for="item in list" :key="item.id" class="card q-mb-lg" @click="router.push(`/product/${item.produce.id}`)">{{item.produce.name}}
  <q-img :src="item.produce.img.match(/^[^+]+/)[0]" style="width: 90vw;border-radius: 1rem" />
  </div>
  <VueEternalLoading :load="load"></VueEternalLoading>
  </div>
</template>

<style scoped lang="scss">
div{
  font-size: 1.5em;
}
</style>
