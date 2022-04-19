import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, staticRoutes } from '@/router/route'
import { routesState } from '../type'
import { filterAsyncRoutes } from '@/utils/handleRoutes'

const state: routesState = {
  count: 0,
  routes: []
}

export default {
  state,
  getters: {
    getRoutes: (state) => state.routes
  },
  mutations: {
    setCount(state: routesState, count: number) {
      state.count = count;
    },
    setRoutes(state: routesState, routes: Array<RouteRecordRaw>) {
      state.routes = staticRoutes.concat(routes)
    }
  },
  actions: {
    async setRoutes({ commit }, permissions: Array<string>): Promise<RouteRecordRaw[]> {
      const finallyAsyncRoutes = await filterAsyncRoutes(
        [...asyncRoutes], permissions
      )
      commit('setRoutes', finallyAsyncRoutes)
      return finallyAsyncRoutes
    },

  }
}