<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref,computed} from 'vue';
import { LocalStorage } from 'quasar'
const router = useRouter();
import BackBtn from 'components/BackBtn.vue';
import http from 'src/utils/http';
const list = ref();
const searchBox = ref('');
const load = ref(false);
interface historyType{
  name:string;
  id:number;
}
const history = ref(LocalStorage.getItem('history') as historyType[]);
interface ClassData {
  id: number;
  name: string
  // other properties
}

const filteredItems = computed(() => {
  return list.value.filter((item: ClassData) => item.name.includes(searchBox.value));
});
(async () => {
  try {
    const [response1] = await Promise.all([
      http.get<{ Data: ClassData[] }>('/class/get_list'),
    ]);

    list.value = response1.data.Data;
    load.value = true;
  } catch (error) {
    console.error(error);
  }
})();
const handelClick = (target:number,name:string) => {
  let prev:historyType[]|null = history.value
  const newElement = { id: target, name: name };
  const updatedHistory = prev
    ? [...prev.filter(item => item.id !== target), newElement]
    : [newElement];

  LocalStorage.set('history', updatedHistory);
  router.push(`/class/${target}`);
}
</script>

<template>
  <BackBtn style="z-index: 9999"/>
  <div v-if="load" class="column q-pa-md fullscreen" style="background-image:url(/others/bg.jpg)">
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: contain;">
      <q-input v-model="searchBox" borderless placeholder="搜  索" class="q-px-xl" style="width: 100%"></q-input>
    </q-field>
    <div v-show="searchBox!=''">
      <div v-for="i in filteredItems" :key="i.id" @click="handelClick(i.id,i.name)">{{ i.name }}</div>
    </div>
      <div>历史记录</div>
    <div class="flex q-gutter-sm">
    <span v-for="a in history?.reverse()" :key="a" style="border:1px solid black;padding: 2px" @click="handelClick(a.id,a.name)" class="rounded-borders">{{a.name}}</span>
    </div>
      <div>猜你想搜</div>
      <div>热搜</div>
  </div>
</template>

<style scoped lang="scss">

</style>
