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
        component: defineAsyncComponent(() => import(`@/pages/home/index.vue`)),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/issueBoard',
        name: 'issueBoard',
        component: defineAsyncComponent(() => import(`@/pages/issueBoard/index.vue`)),
        meta: {
          title: 'issue 看板'
        }
      },
      {
        path: '/issueList',
        name: 'issueList',
        component: defineAsyncComponent(() => import(`@/pages/issueList/index.vue`)),
        meta: {
          title: 'issue 列表'
        }
      },
      {
        path: '/apiError',
        name: 'apiError',
        component: defineAsyncComponent(() => import(`@/pages/apiError/index.vue`)),
        meta: {
          title: 'api 错误列表'
        }
      },
      {
        path: '/errorReport',
        name: 'errorReport',
        component: defineAsyncComponent(() => import(`@/pages/errorReport/index.vue`)),
        meta: {
          title: '错误报告'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: defineAsyncComponent(() => import(`@/pages/login.vue`))
  },
]