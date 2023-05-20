import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

Vue.config.productionTip = false

// 将三级联动组件注册为全局组件
// 1.先引入 TypeNav 组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
// 2.注册 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 引入 mockServe.js---mock数据
import '@/mock/mockServe'
// 引入 swiper 样式
import 'swiper/css/swiper.css'
// 统一引入 api 文件夹里面全部请求函数
import * as API from '@/api'
// 按需引入 ElementUI
import { MessageBox,Message } from 'element-ui'
// Button 引入方式：注册为全局组件
// MessageBox（项目中的弹出框） 引入方式：挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
// 引入vue-lazyload插件
import VueLazyload from 'vue-lazyload'
// 引入loading图片
import loadimage from '@/assets/images/loading.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 配置项：loading图片
  loading: loadimage
})
// 引入表单验证
import '@/validate/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus 配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  // 注册路由信息，当这里书写 router 的时候，组件身上都拥有 $route，$router 属性
  router,
  // 注册仓库：组件实例的身上会多一个属性，$store 属性
  store
}).$mount('#app')
