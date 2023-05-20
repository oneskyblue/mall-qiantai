import { reqOrderInfo } from '@/api'

const state = {
  orderInfo: {}
}
const actions = {
  // 获取商品订单
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}
const mutations = {
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}