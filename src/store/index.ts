import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex'
import { State } from './type'

/**
 * 对应 webpack 中下面的写法
 * const files = require.context('./modules', false, /\.ts$/)
 */
const files = import.meta.globEager('./modules/*.ts')
const modules = {}
/**
 * 对应 webpack 中下面的写法
 * files.keys().forEach((key) => {
 *  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
 * })
 * 用文件名作为模块名
 */
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
}
Object.keys(modules).forEach(item => {
  modules[item]['namespaced'] = true
})

// TypeScript 用户可以使用injection key 来检索已经定义类型的 store 。
export const key: InjectionKey<Store<State>> = Symbol('vue-store')

export default createStore<State>({
  modules
})