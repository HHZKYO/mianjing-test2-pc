import request from '@/utils/request'

// 获取文章面经列表
export const getArticleList = ({ current, pageSize }) => {
  return request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
}
// 新增文章
export const createArticle = ({ stem, content }) => {
  return request.post('/admin/interview/create', {
    stem,
    content
  })
}
