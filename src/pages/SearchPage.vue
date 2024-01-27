<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { LocalStorage } from 'quasar';

const router = useRouter();
import BackBtn from 'components/BackBtn.vue';
import http from 'src/utils/http';

const list = ref();
const searchBox = ref('');
const load = ref(false);

interface historyType {
  name: string;
  id: number;
}

const suggest = ref();
const history = ref(LocalStorage.getItem('history') as historyType[]);

interface ClassData {
  id: number;
  name: string;
  // other properties
}

const filteredItems = computed(() => {
  return list.value.filter((item: ClassData) => item.name.includes(searchBox.value));
});
(async () => {
  try {
    const [response1, response2] = await Promise.all([
      http.get<{ Data: ClassData[] }>('/class/get_list'),
      http.get('/suggest')
    ]);
    list.value = response1.data.Data;
    suggest.value = {
      guess: response2.data.guess.map((item: string) => {
        const arr = item.split(' ');
        return { id: arr[0], name: arr[1] };
      }),
      hot:response2.data.hot.map((item: string) => {
      const arr = item.split(' ');
      return { id: arr[0], name: arr[1] };
    })
  };
    load.value = true;
  } catch (error) {
    console.error(error);
  }
})();
const handelClick = (target: number, name: string) => {
  let prev: historyType[] | null = history.value;
  const newElement = { id: target, name: name };
  const updatedHistory = prev
    ? [...prev.filter(item => item.id !== target), newElement]
    : [newElement];

  LocalStorage.set('history', updatedHistory);
  router.push(`/class/${target}`);
};
</script>

<template>
  <BackBtn style="z-index: 9999" />
  <div v-if="load" class="column q-pa-md fullscreen" style="background-image:url(/others/bg.jpg)">
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: cover;">
      <q-input v-model="searchBox" borderless placeholder="搜  索" class="q-px-xl" style="width: 100%"></q-input>
    </q-field>
    <div v-show="searchBox!=''">
      <div v-for="i in filteredItems" :key="i.id" @click="handelClick(i.id,i.name)">{{ i.name }}</div>
    </div>
    <div class="text-h5 q-my-md">历史记录</div>
    <div class="flex q-gutter-sm">
      <span v-for="a in history?.reverse()" :key="a" style="border:1px solid black;padding: 2px"
            @click="handelClick(a.id,a.name)" class="rounded-borders">{{ a.name }}</span>
    </div>
    <div v-if="suggest">
      <div class="text-h5 q-my-md">猜你想搜</div>
      <div class="row q-gutter-sm"><span class="rounded-borders" v-for="item in suggest.guess" :key="item.id" @click="router.push(`/product/${item.id}`)" style="border:1px solid black;padding: 2px">{{item.name}}</span> </div>
      <div class="text-h5 q-my-md">热搜</div>
      <div class="row q-gutter-sm"><span class="rounded-borders" v-for="item in suggest.hot" :key="item.id" @click="router.push(`/product/${item.id}`)" style="border:1px solid black;padding: 2px">{{item.name}}</span> </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
