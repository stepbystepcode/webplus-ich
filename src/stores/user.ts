import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    username: '未登录'
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
    login(username:string){
      this.username=username;
    },
    logout(){
      this.username='未登录'
    }
  }
});
