<script setup lang="ts">
import axios from 'axios';
import {useRouter} from 'vue-router';
import {ref,computed} from 'vue';
const router = useRouter();
import BackBtn from 'components/BackBtn.vue';
const list = ref();
const searchBox = ref('');
const load = ref(false);

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
      axios.get<{ Data: ClassData[] }>('https://link.ichgo.cn/api/v1/class/get_list'),
    ]);

    list.value = response1.data.Data;
    load.value = true;
  } catch (error) {
    console.error(error);
  }
})();
</script>

<template>
  <BackBtn style="z-index: 9999"/>
  <div v-if="load" class="column q-pa-md fullscreen" style="background-image:url(/others/bg.jpg)">
    <q-field borderless style="background-image: url(/others/search-bar.png); background-size: contain;">
      <q-input v-model="searchBox" borderless placeholder="搜  索" class="q-px-xl" style="width: 100%"></q-input>
    </q-field>
    <div v-show="searchBox!=''">
      <div v-for="i in filteredItems" :key="i.id" @click="router.push(`/class/${i.id}`)">{{ i.name }}</div>
    </div>
      <div>历史记录</div>
      <div>猜你想搜</div>
      <div>热搜</div>
  </div>
</template>

<style scoped lang="scss">

</style>
