import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  cartList: []
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartBySkuId(_, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某一个产品的状态
  async updateCheckedById(_, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除选中的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    // 获取购物车中全部的产品（是一个数组）
    getters.cartList.cartInfoList.forEach(item => {
      // 将选中的产品删除，不选中的返回空字符串不进行删除
      let promise = item.isChecked === 1 ? dispatch('deleteCartBySkuId', item.skuId) : ''
      // 将每一次返回的 Promise 添加到 PromiseAll 数组中
      PromiseAll.push(promise)
    })
    // Promise.all([p1, p2, p3]) 用法，p1, p2, p3：每一个都是 Promise 对象
    // 只要 PromiseAll 数组当中的 Promise 都成功，返回结果即为成功
    // 如果有一个失败，返回结果即为失败
    return Promise.all(PromiseAll)
  },
  // 全选的勾选状态
  updateAllCheckedCart({ dispatch, getters }, isChecked) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}