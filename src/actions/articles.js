import axios from '../utils/request'
import { API_ARTICLES, API_COMMENTS, API_CHANNELS, API_LOGIN, API_MATERIAL, API_USERINFO } from '../constant/api'
// 登录
export function login (formData) {
  return axios({
    url: API_LOGIN,
    method: 'post',
    data: formData
  })
}
// 发表文章
export function articlePublish (id, draft, dataform) {
  return axios({
    url: id ? API_ARTICLES + `/${id}` : API_ARTICLES,
    method: id ? 'put' : 'post',
    params: {
      draft
    },
    data: dataform
  })
}
// 获取指定文章
export function getArticleById (id) {
  return axios({
    url: API_ARTICLES + `/${id}`
  })
}
// 获取素材
export function getMaterial (params) {
  return axios({
    url: API_MATERIAL,
    params
  })
}
// 上传素材
export function uploadImg (fd) {
  return axios({
    url: API_MATERIAL,
    method: 'post',
    data: fd
  })
}
// 收藏或取消收藏素材
export function collectOrCancel (id, status) {
  return axios({
    url: API_MATERIAL + `/${id}`,
    method: 'put',
    data: {
      collect: !status
    }
  })
}
// 删除素材
export function deleteImg (id) {
  return axios({
    url: API_MATERIAL + `/${id}`,
    method: 'delete'
  })
}
// 获取评论列表
export function getComment (params) {
  return axios({
    url: API_ARTICLES,
    params
  })
}
// 打开关闭评论
export function openOrClose (id, status) {
  return axios({
    url: API_COMMENTS,
    method: 'put',
    params: {
      article_id: id.toString()
    },
    data: {
      allow_comment: !status
    }
  })
}
// 获取文章列表
export function getContentList (params) {
  return axios({
    url: API_ARTICLES,
    params
  })
}
// 删除文章列表
export function delContent (id) {
  axios({
    url: API_ARTICLES + `/${id}`,
    method: 'delete'
  })
}
// 获取频道列表
export function getChannel () {
  return axios({
    url: API_CHANNELS
  })
}
// 获取用户信息
export function getUserInfo () {
  return axios({
    url: API_USERINFO
  })
}
// 修改保存用户信息
export function saveUserInfo (formData) {
  return axios({
    url: API_USERINFO,
    method: 'patch',
    data: formData
  })
}
