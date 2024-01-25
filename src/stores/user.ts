import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
  state: () => ({
    username: '未登录',
    token:''
  }),

  getters: {
    //doubleCount (state) {
      //return state.counter * 2;
    //}
  },

  actions: {
    //increment () {
      //this.counter++;
    //}
    login(username:string,token?:string){
      this.username=username;
      this.token=token||'';
    },
    logout(){
      this.username='未登录'
      this.token='';
    }
  }
});
