// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入 store
import store from '@/store'

// 对 axios 进行二次封装

import axios from 'axios'

// 利用 axios 对象的方法 create 去创建一个 axios 实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现 api
  baseURL: '/api',
  // 代表请求超时的时间
  timeout: 5000
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start()
  // config: 配置对象，对象里面有一个属性很重要，headers 请求头
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段 userTempId ：字段不能瞎写，这里和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带 token 带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
})
// 响应拦截器：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  // 响应成功的回调函数
  return res.data
}, (err) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'))
})

export default requests