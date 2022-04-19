import { RouteRecordRaw } from 'vue-router'

/**
 * @description 判断当前路由是否包含权限
 * @param permissions 
 * @param route 
 * @returns 
 */
function hasPermission(permissions: Array<string>, route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role: string) => {
      (route.meta!.permissions as Array<string>).includes(role)
    })
  } else {
    return true
  }
}

/**
 * @description 
 * @param routes 
 * @param permissions 
 * @returns 
 */
export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, permissions: Array<string>): Array<RouteRecordRaw> {
  const finallyRoutes: Array<RouteRecordRaw> = []
  routes.forEach((route: RouteRecordRaw) => {
    const item: RouteRecordRaw = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}