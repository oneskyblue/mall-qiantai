// 引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 路由懒加载
const foo = () => {
  // console.log(111)
  return import('@/pages/Home')
}

export default [
  {
    path: '/home',
    // component: Home,
    component: foo,
    meta: { show: true, title: '首页' }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true, title: '搜索' },
    name: 'search',
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false, title: '登录' }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false, title: '注册' }
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true, title: '商品详情' }
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true, title: '加购成功' },
    name: 'addcartsuccess'
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true, title: '我的购物车' }
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true, title: '结算' }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true, title: '支付' },
    // 路由独享守卫
    /* beforeEnter: (to, from, next) => {
      // 如果是从trade路由跳转来的，放行
      if (from.path == '/trade') {
        next()
      } else {
        // 如果不是，中断路由跳转
        next(false)
      }
    } */
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true, title: '支付成功' }
  },
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由
    children: [
      {
        // 二级路由路径写法，不需要写 /
        path: 'myorder',
        component: MyOrder,
        meta: { title: '我的订单' }
      },
      {
        path: 'grouporder',
        component: GroupOrder,
        meta: { title: '团购订单' }
      },
      // 重定向，当跳转到 center 路由时，自动跳转到 myorder 路由
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  // 重定向，在项目开始运行起来时，访问 '/' 定向到 '/home'
  {
    path: '/',
    redirect: '/home'
  }
]