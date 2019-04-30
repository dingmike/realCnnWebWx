import request from '../utils/request'

export function getArticleList(params) {
  return request({
    url: '/apiv1/article/list',
    method: 'get',
    params: params
  })
}
