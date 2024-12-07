import { login } from '@/api/user'

export default {
  namespaced: true,
  state () {
    return {
      token: '',
      words: '测试数据'
    }
  },
  mutations: {
    setUserToken (state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    async loginAction (context, obj) {
      const res = await login(obj)
      context.commit('setUserToken', res.data.token)
    }
  },
  getters: {}
}
