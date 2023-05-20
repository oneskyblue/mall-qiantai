import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客临时身份模块 uuid ，生成一个随机字符串（生成一个以后不能再变）
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取产品详细信息的 action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    // console.log(result)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的结果
    // 加入购物车发请求，前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回 code = 200 ，代表这次操作成功
    // 因为发送请求后服务器没有返回其余数据，因此不需要三连环存储数据
    // 注意：async 函数执行返回的结果一定是一个 promise （要么成功，要么失败）
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // console.log(result)
    if (result.code === 200) {
      // 返回的是成功的标记
      return 'ok'
    } else {
      // 返回的是失败的标记
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
// 简化数据
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    // 当服务器数据还没返回时，goodsInfo 是一个空对象，那么 goodsInfo.categoryView(categoryView 的属性值) 是 undefined，控制台会出现假报错
    // 当前计算出的 categoryView 的属性值至少是一个空对象，那么控制台出现的假报错就不会出现
    return state.goodsInfo.categoryView || {}
  },
  // 产品信息简化的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品属性简化的数据
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}