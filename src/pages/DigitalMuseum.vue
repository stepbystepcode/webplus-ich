<script setup lang="ts">
import { ElAmap, ElAmapExpose, ElAmapProps, ElMarker } from '@dabu/vue3-amap';
import type { ElMarkerProps } from '@dabu/vue3-amap';
import { onMounted, reactive, ref } from 'vue';
import http from 'src/utils/http';
import { useRouter } from 'vue-router';

interface Data {
  longitude: number;
  latitude: number;
  name: string;
  id: number;
  cover: string;
}

const router = useRouter();
const AmapRef = ref<ElAmapExpose | null>(null);
const data = ref<Array<ElMarkerProps>>();
onMounted(async () => {
  const response = await http.get('/location/get_list?size=1000&page=1');
  const array = (response.data.Data as Data[]);
  data.value = array.map(
    (item: Data) => {
      return {
        position: [item.longitude, item.latitude],
        label: {
          content: item.name,
          offset: [0, 0],
          direction: 'bottom'
        },
        id: item.id,
        icon: `${item.cover}?w=50`,
        anchor: 'bottom-center',
      };
    }
  );
  console.log(data.value);
});
const amapOptions = reactive<ElAmapProps>({
  zoom: 5,
  center: [111.86409,30.960558]
});
</script>

<template>
  <div style="width: 100vw;height: 100vh" v-if="data">
    <ElAmap
      ref="AmapRef"
      v-model:center="amapOptions.center"
      v-model:zoom="amapOptions.zoom"
    >
      <ElMarker
        v-for="marker in data"
        :key="marker.id"
        :label="marker.label"
        :icon="marker.icon"
        :position="marker.position"
        @click="router.push('/product/' + marker.id)"
      />
      <!--      <ElMarker-->
      <!--        v-for="item in data"-->
      <!--        :key="item.id"-->
      <!--        :position="[item.longitude, item.latitude]"-->
      <!--        :label="{-->
      <!--            content: item.name,-->
      <!--            offset: [0, 0],-->
      <!--            direction: 'bottom',-->
      <!--          }"-->
      <!--      />-->
    </ElAmap>
  </div>
</template>

<style scoped lang="scss">

</style>
