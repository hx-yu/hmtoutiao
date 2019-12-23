// 统一处理axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JsonBig from 'json-bigint'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('user_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// 在数据返回then或catch前对数据进行处理
axios.defaults.transformResponse = [data => {
  return data ? JsonBig.parse(data) : {} // 处理当data为空字符串的情况
}]
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400 :
      message = '请求参数错误'
      break
    case 507 :
      message = '服务器数据库异常'
      break
    case 401 :
      window.localStorage.removeItem('user_token')
      router.push('/login')
      break
    case 403 :
      message = '没有权限访问'
      break
    default :
      break
  }
  Message({
    message,
    type: 'warning'
  })
  return Promise.reject(error)
})
export default axios
