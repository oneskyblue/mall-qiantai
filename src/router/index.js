// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入配置路由模块
import routes from './routes'
// 引入 store
import store from '@/store/'

// 先把 VueRouter 原型对象的 push|replace 保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写 push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router =  new VueRouter({
  // 路由器工作模式：1.默认为hash模式（地址中带#号）2.history模式（地址中不带#号）
  mode:'history',
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的 y = 0，代表滚动条在最上方
    return { y: 0 }
  }
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到哪个路由的信息
  // from:可以获取到你从哪个路由而来的信息
  // next:放行函数 1.next():全部路由放行 2.next(path):指定路由放行 3.next(false)
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 用户登录
  if (token) {
    // 用户已经登录了，去 login 页面（不能去，停留在 home 首页）
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 用户已经登录了，但是去的不是 login 页面（去的是 home|search|detail|shopcart）
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 如果没有用户信息，派发 action 让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // token 失效了获取不到用户信息，重新登录
          // 清除 token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 用户没有登录，不能去我的订单(center/myorder)、trade、pay、paysuccess路由
    let toPath = to.path
    if (toPath.indexOf('/center') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面的路由，放行
      next()
    }
  }
})
// 全局守卫：后置守卫（在路由跳转之后进行一些操作）
router.afterEach((to, from) => {
  // 修改网页的title
  document.title = to.meta.title
})

// 对外暴露 VueRouter 类的实例
export default router