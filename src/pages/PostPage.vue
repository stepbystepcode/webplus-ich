<script setup lang="ts">
import { ref } from 'vue';
import BackBtn from 'components/BackBtn.vue';
import http from 'src/utils/http';

const text = ref('');

const images = ref<string[]>([]);

const uploadImages = async (event:any) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    if (images.value.length === 9) break;

    const formData = new FormData();
    formData.append('file', files[i]);

    const response = await http.post('https://link.ichgo.cn/api/v1/upload/img/test', formData);
    images.value[images.value.length] = response.data;
  }
};


</script>

<template>
  <back-btn/>
  <div class="row justify-between items-center q-pl-xl q-pr-lg" style="height: 4rem">
  <span class="text-h5">发布动态</span>
  <q-btn style="background: #4ac5d3;color: white" flat>发布</q-btn>
  </div>
<div class="column q-ma-md q-gutter-y-md">
  <q-input v-model="text" style="font-size: 1.5em" standout type="textarea" placeholder="请输入内容..."></q-input>
  <div class="grid">
    <div v-for="(item, index) in images" :key="index" class="grid-item">
      <img v-if="item" :src="item" alt="" />
    </div>
    <label for="file-upload" class="text-white bg-grey column justify-center items-center" style="height: 30vw">
      <span style="font-size: 3em">+</span>
      上传图片
    </label>
    <input id="file-upload" type="file" multiple @change="uploadImages" style="display: none;" />
  </div>
<!--  <q-uploader-->
<!--    url="https://link.ichgo.cn/api/v1/upload/img/test"-->
<!--    multiple-->
<!--    flat-->
<!--    square-->
<!--    color="brown"-->
<!--    bordered-->
<!--    max-files="3"-->
<!--  />-->
</div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid-item {
  width: 30vw;
  height: 30vw;
  background-color: gray;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
