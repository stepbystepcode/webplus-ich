import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      {
        path: '/moments',
        component: () => import('src/pages/MomentsPage.vue'),
      },
      { path: '/dm', component: () => import('pages/DigitalMuseum.vue') },
      { path: '/shop', component: () => import('pages/ShopPage.vue') },
      { path: '/history', component: () => import('pages/HistoryPage.vue') },
      { path: '/order', component: () => import('pages/OrderPage.vue') },
      { path: '/goods/:id', component: () => import('pages/GoodsDetail.vue') },
      { path: '/shop/:id', component: () => import('pages/ShopClass.vue') },
      { path: '/cart', component: () => import('pages/ShopCart.vue') },
      { path: '/news', component: () => import('pages/NewsPage.vue') },
      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      { path: '/search', component: () => import('pages/SearchPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignupPage.vue') },
      { path: '/class/:id', component: () => import('pages/ClassDetail.vue') },
      { path: '/product/:id', component: () => import('pages/ProductDetail.vue') },
      { path: '/post', component: () => import('pages/PostPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
