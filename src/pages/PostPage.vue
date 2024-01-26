<script setup lang="ts">
import { ref } from 'vue';
import BackBtn from 'components/BackBtn.vue';
import http from 'src/utils/http';

const text = ref('');

interface Img{
  url:string;
  width:string;
  height:string;
}
const images = ref<Img[]>([]);

const uploadImages = async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    if (images.value.length === 9) break;

    const formData = new FormData();
    formData.append('file', files[i]);

    try {
      const response = await http.post('/upload/img/test', formData);

      // 创建一个新的Image对象
      const img = new Image();
      img.src = URL.createObjectURL(files[i]);

      // 当图片加载时获取宽度和高度
      img.onload = () => {
        images.value.push({
          url: response.data,
          width: img.width.toString(),
          height: img.height.toString(),
        });

        // 释放对象 URL，避免内存泄漏
        URL.revokeObjectURL(img.src);
      };

      // 如果有错误，可以在这里处理
      img.onerror = (error) => {
        console.error('Error in loading image', error);
      };

    } catch (error) {
      console.error('Error in uploading image', error);
    }
  }
};
const post = async() => {
  const response = await http.post('/dynamic/post', {detail:text.value,img:images.value});
  console.log(response);

}


</script>

<template>
  <back-btn/>
  <div class="row justify-between items-center q-pl-xl q-pr-lg" style="height: 4rem">
  <span class="text-h5">发布动态</span>
  <q-btn style="background: #4ac5d3;color: white" flat @click="post">发布</q-btn>
  </div>
<div class="column q-ma-md q-gutter-y-md">
  <q-input v-model="text" standout="bg-white text-black" input-class="text-black" style="font-size: 1.5em" type="textarea" placeholder="请输入内容..."></q-input>
  <div class="grid">
    <div v-for="(item, index) in images" :key="index" class="grid-item">
      <img v-if="item" :src="item.url" alt="" />
    </div>
    <label for="file-upload" class="text-white bg-grey-4 column justify-center items-center" style="height: 30vw">
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
