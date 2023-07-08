<script setup lang="ts">
const account=[{
  icon:'message',
  text:'系统消息'
},{
  icon:'history',
  text:'历史记录'
},{
  icon:'study',
  text:'学习记录'
}]
const content=[
  {
    icon:'make',
    text:'我的制作'
  },{
    icon:'favourite',
    text:'我的收藏'
  },{
    icon:'ticket',
    text:'我的门票'
  },{
    icon:'orders',
    text:'我的订单'
  },{
    icon:'cart',
    text:'购物车'
  }
]
</script>

<template>
  <img class="bg" src="/profile/profile-bg.png" alt="">
  <div class="q-ma-md">
    <div class="text-h5 q-py-lg">我的</div>
    <div class="radius column flex-center shadow-2" style="background: url(/others/bg.jpg);height: 10rem"><q-img class="avatar" src="/others/avatar.jpg" alt=""></q-img>
      <div style="color: #d0ad68;font-size: 1.7em">Robert Fox</div>
      <q-btn class="be-artist">成为识艺者</q-btn>
    </div>
    <div class="text-h6 q-my-md">我的账户</div>
    <div v-for="i in account" :key="i">{{i.text}}</div>
    <div class="text-h6 q-my-md">我的内容</div>
    <div v-for="i in content" :key="i">{{i.text}}</div>
    <div class="text-h6 q-my-md">我的服务</div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  position: absolute;
  left: -2rem;
  top: -5rem;
  z-index: -1;
  width: 110%;
  filter: sepia(1);
  transform: rotate(-19deg);
}
.avatar{
  width: 6rem;
  height: 6rem;
  border: 1px solid black;
  border-radius: 50%;
  margin-top: -5rem;
}
.be-artist{
  position: relative;
  left: 7rem;
  top: 1.5rem;
  border-radius: 100px;
  background: white;
}

</style>
