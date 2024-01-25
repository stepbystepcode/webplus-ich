<script setup lang="ts">
import {ref} from 'vue';
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/user';
import {useRouter} from 'vue-router';
import http from 'src/utils/http';
const router=useRouter();
const store = useUserStore();

const $q = useQuasar()
const username=ref('');
const password=ref('');
const re_password=ref('');
const onSubmit=()=>{
  let data={
    username:username.value,
    password:password.value,
    re_password:re_password.value
  }
  http.post('/user/signup',data).then(res=>{
    let status=res.data.Code==1000;
    $q.notify({

      color: status?'green-4':'red-4',
      textColor: 'white',
      icon: res.data.Code==1000?'done':'error',
      message: res.data.Msg=='success'?'注册成功':res.data.Msg
    });
    if(status){
      store.login(username.value);
    }else{
      store.logout();
    }
  });
}
</script>

<template>
  <q-form class="q-ma-md q-gutter-y-md column" @submit="onSubmit">
    <q-input outlined label="用户名" v-model="username" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-input outlined type="password" label="密码" v-model="password" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-input outlined type="password" label="重复密码" v-model="re_password" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-btn type="submit">注册</q-btn>
    <q-btn @click="router.push('/login')">已有账号？去登录</q-btn>
  </q-form>
</template>

<style scoped lang="scss">

</style>
