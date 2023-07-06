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
      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue'),
      },
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
