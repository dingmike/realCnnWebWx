import 'es6-promise'
import axios from 'axios'
import store from '../store/index'
axios.defaults.withCredentials=true; // 和后台的credentials设置配合使用在前后端分离情况下保持session
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // api的base_url
  timeout: 5000 // request timeout
})

//http 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'JWT ' + store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

//http 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.status === 0 && (res.errCode === 401 || res.errCode === 403)) {
    store.dispatch('setLoginStatus', 0)
    //重新登录
    window.location.reload()
  }
  return res
}, error => {
  return Promise.reject(error)
})

export default service
