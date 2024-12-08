import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response) {
    if (error.response.status === 401) {
      Message.error('尊敬的用户，当前登录状态已过期！')
      store.commit('user/logout')
      router.push('/login')
    } else {
      Message.error(error.response.data.message)
    }
  }
  return Promise.reject(error)
})

export default request
