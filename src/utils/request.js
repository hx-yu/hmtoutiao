// 统一处理axios
import axios from 'axios'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('user_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function () {

})
export default axios
