import { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: defineAsyncComponent(() => import(`@/pages/layout/index.vue`)),
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: defineAsyncComponent(() => import(`@/pages/home/index.vue`))
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: defineAsyncComponent(() => import(`@/pages/login.vue`))
  },
]