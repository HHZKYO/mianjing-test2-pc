import { login } from '@/api/user'

export default {
  namespaced: true,
  state () {
    return {
      token: '',
      words: '测试数据'
    }
  },
  mutations: {},
  actions: {
    async loginAction (context, obj) {
      const res = await login(obj)
      console.log(res.data.token)
    }
  },
  getters: {}
}
