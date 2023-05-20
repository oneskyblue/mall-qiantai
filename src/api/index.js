// 当前这个模块的作用：将 api 接口进行统一管理

// 引入二次封装的 axios
import requests from './ajax'
import mockRequest from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqGetCategoryList = () => {
  // 发请求：axios 发请求返回结果是 Promise 对象
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
// 获取 banner （Home 首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequest.get('/banner')
}
// 获取 floor 数据
export const reqGetFloorList = () => {
  return mockRequest.get('/floor')
}
// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要参数，参数例子如下
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
// 当前这个接口，给服务器传递一个默认参数（至少是一个对象）
export const reqGetSearchInfo = (params) => {
  return requests({ url: '/list', method: 'post', data: params })
}
// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'get' })
}
// 将产品加入购物车，或者对已有产品进行数量改动
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
// 获取购物车列表信息的接口
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: 'get' })
}
// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
// 修改产品选中状态的接口
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
// 获取验证码的接口
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
// 注册用户的接口
export const reqUserRegister = (data) => {
  return requests({ url: '/user/passport/register', data, method: 'post' })
}
// 登录的接口
export const reqUserLogin = (data) => {
  return requests({ url: '/user/passport/login', data, method: 'post' })
}
// 获取用户信息的接口（需要带着用户的 token 向服务器要用户信息）
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}
// 退出登录的接口
export const reqUserLogout = () => {
  return requests({ url: '/user/passport/logout', method: 'get' })
}

// 获取商品订单的接口
export const reqOrderInfo = () => {
  return requests({ url: '/order/auth/trade', method: 'get' })
}
// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
}
// 获取订单支付信息的接口
export const reqPayInfo = (orderId) => {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}
// 获取订单支付状态的接口
export const reqPayStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}
// 获取个人中心订单数据的接口
export const reqMyOrder = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}