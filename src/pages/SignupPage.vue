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
const phone=ref('');
const code=ref<number|null>(null);
const password=ref('');
const re_password=ref('');
const check=ref(false);
const onSubmit=()=>{
  let data={
    username:username.value,
    password:password.value,
    re_password:re_password.value
  }
  if(!username.value||!phone.value||!code.value||!password.value||!re_password.value){
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '请填写所有信息'
    });
    return;
  }
  if(!check.value) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '请阅读并同意《云上非遗用户协议》'
    });
    return;
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
const disableSendBtn = ref(false)
const buttonText = ref('发送验证码')
let remainSeconds = 0
const sendCode = () => {
  if (phone.value.length !== 11) {
    $q.notify({ message: '手机号格式不正确' })
    return
  }
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'done',
    message: '已发送验证码'
  })
  disableSendBtn.value = true
  remainSeconds = 60
  buttonText.value = `重新发送 (${remainSeconds})`

  // 计时器
  const timerId = setInterval(() => {
    remainSeconds--
    if (remainSeconds > 0) {
      buttonText.value = `重新发送 (${remainSeconds})`
    } else {
      clearInterval(timerId)
      buttonText.value = '重新发送'
      $q.notify({ message: '如未收到验证码，请重新获取' })
      disableSendBtn.value = false
    }
  }, 1000)
}
</script>

<template>
  <div class="fullscreen" style="background: url(/others/bg.jpg);filter: blur(2px);z-index: -1"></div>
  <q-form class="q-ma-md q-gutter-y-md column" @submit="onSubmit">
    <q-input outlined label="用户名" v-model="username" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-input outlined label="手机号" v-model="phone" lazy-rules
             :rules="[ val => val && val.length === 11 || '格式不正确']"></q-input>
    <div class="row q-gutter-lg justify-between">
    <q-input style="flex:1" outlined type="number" label="短信验证码" v-model="code" lazy-rules
             :rules="[ val => val && val.toString().length === 6 || '格式不正确']"></q-input>
    <q-btn class="bg-white" style="height: 3.5rem" @click="sendCode">{{ buttonText }}</q-btn>
    </div>
    <q-input outlined type="password" label="密码" v-model="password" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-input outlined type="password" label="重复密码" v-model="re_password" lazy-rules
             :rules="[ val => val && val.length > 0 || '请填写此项']"></q-input>
    <q-checkbox v-model="check" label="我已阅读并同意《云上非遗用户协议》"></q-checkbox>
    <q-btn class="bg-white" type="submit">注册</q-btn>
    <q-btn class="bg-white" @click="router.push('/login')">已有账号？去登录</q-btn>
  </q-form>
</template>

<style scoped lang="scss">

</style>
