import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      token: getToken() || '',
      words: '测试数据'
    }
  },
  mutations: {
    setUserToken (state, newToken) {
      state.token = newToken
      setToken(newToken)
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
