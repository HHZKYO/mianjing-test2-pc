import request from '@/utils/request'

// 登录请求
export const login = ({ username, password }) => {
  return request.post('/auth/login', {
    username,
    password
  })
}
