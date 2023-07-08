<template>
  <q-layout view="lHh Lpr lFf">
    <Suspense>
    <q-page-container>
      <router-view />
    </q-page-container>
    </Suspense>
    <q-footer class="bg-white fixed">
      <q-separator />
      <q-tabs dense align="justify" v-model="activeTab" class="text-black">
        <q-route-tab v-for="tab in tabs" :key="tab.name" :class="{ 'text-brown-5': isActiveTab(tab) }" :ripple="false"
           no-caps :name="tab.name" :to="tab.routePath" :icon="getTabIcon(tab)" :label="tab.label" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
interface Tab {
  name: string;
  label: string;
  icon: string;
  routePath: string;
  routeName: string;
}

const tabs: Tab[] = [
  { name: 'home', label: '首页', icon: 'home', routePath: '/home', routeName: 'home' },
  { name: 'moments', label: '动态', icon: 'motion_photos_on', routePath: '/moments', routeName: 'moment' },
  { name: 'dm', label: '数博', icon: 'account_balance', routePath: '/dm', routeName: 'dm' },
  { name: 'shop', label: '电商', icon: 'shopping_cart', routePath: '/shop', routeName: 'shop' },
  { name: 'profile', label: '我的', icon: 'account_circle', routePath: '/profile', routeName: 'profile' },
];

const activeTab = ref('');

const getTabIcon = (tab: Tab) => {
  const route = useRoute();
  return route.path.includes(tab.name) ? tab.icon : `o_${tab.icon}`;
};

// 响应式计算属性，用于将 selectedTab 与路由同步
const isActiveTab = (tab: Tab) => {
  const route = useRoute();
  return route.path.includes(tab.name);
};
</script>
