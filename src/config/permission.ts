import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import router from '@/router'

/**
 * router.beforeResolve 的作用与 router.beforeEach 类似，也是在路由跳转前触发
 * 但是时间点会晚于 router.beforeEach 以及非同步路由组件解析以后才被调用
 */
router.beforeResolve(async (to, from, next) => {
  if (store.getters['user/isLogin']) {
    let accessRoutes: Array<RouteRecordRaw> = []
    if (store.getters['routes/getRoutes'].length == 0) {
      accessRoutes = await store.dispatch('routes/setRoutes', ['admin'])
      addRoutes(accessRoutes)
      /**
       * vueRouter4.0 去除了 addRoutes 方法
       * 添加路由并不会触发新的导航。也就是说，除非触发新的导航，否则不会显示所添加的路由
       * 如果参数 to 不能找到对应的路由的话，就应该再执行一次 beforeResolve 直到其中的 next({...to}) 能够找到对应路由为止
       */
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})

function addRoutes(routes: Array<RouteRecordRaw>) {
  routes.forEach((route: RouteRecordRaw) => {
    router.addRoute(route)
  })
}