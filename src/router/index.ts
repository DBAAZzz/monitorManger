import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes } from './route';

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router;