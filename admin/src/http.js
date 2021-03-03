import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 给http请求添加拦截器，用于添加用户信息
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 给http响应添加拦截器，用于处理错误信息
http.interceptors.response.use(res => {
  return res
}, err => {
  // 主要处理错误信息
  // 如果有错误信息，则弹出element-UI中的Message
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http