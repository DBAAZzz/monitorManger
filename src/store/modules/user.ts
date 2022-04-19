import { userState } from '../type'

const state: userState = {
  name: 'DBAA',
  isLogin: true,
}

export default {
  state,
  getters: {
    isLogin(state) {
      return state.isLogin
    }
  },
  mutations: {
    setName(state: userState, name: string) {
      state.name = name;
    },
  },
}