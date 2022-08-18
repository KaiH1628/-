//  向服务器发送请求，获取验证码
import request from '@/utils/request'

export function getComment(page = 1, limit = 10) {
  return request({ url: '/api/comment', method: 'get', params: { page, limit } })
}

export function delComment(id) {
  return request({ url: `/api/comment/${id}`, method: 'delete' })
}
