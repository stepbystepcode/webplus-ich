<script setup lang="ts">
import {ref} from 'vue';
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user';
const store = useUserStore();
import {useRouter} from 'vue-router';
import http from 'src/utils/http';
const router=useRouter();

const $q = useQuasar()
const username=ref('');
const password=ref('');
const onSubmit=()=>{
  let data={
    username:username.value,
    password:password.value
  }
  http.post('/user/login',data).then(res=>{
    let status=res.data.Code==1000;
    $q.notify({
      color: status?'green-4':'red-4',
      textColor: 'white',
      icon: res.data.Code==1000?'done':'error',
      message: res.data.Msg=='success'?'登录成功':res.data.Msg
    });
    if(status){
      store.login(username.value,res.data.Data);
      window.localStorage.setItem('token',res.data.Data);
      window.localStorage.setItem('username',username.value);
      router.push('/');
    }else{
      store.logout();
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
    }
  });
}
</script>

<template>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <q-form class="q-ma-md q-gutter-y-md column" @submit="onSubmit">
    <q-input outlined label="用户名" v-model="username" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-input outlined type="password" label="密码" v-model="password" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-btn  class="bg-white" type="submit">登录</q-btn>
    <q-btn  class="bg-white" @click="router.push('/signup')">没有账号？去注册</q-btn>
  </q-form>
</template>

<style scoped lang="scss">

</style>
