import { RouteRecordRaw } from 'vue-router'
export interface routesState {
  count: number,
  routes: Array<RouteRecordRaw>
}

export interface userState {
  name: string,
  isLogin: boolean
}

export interface State {
  routes: routesState,
  user: userState
}