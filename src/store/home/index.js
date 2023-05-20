import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// home 模块的小仓库
// state: 仓库存储数据的地方
const state = {
  // state 中数据默认初始值根据接口返回值初始化的
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor 组件的数据
  floorList: []
}
// actions: 可以书写业务逻辑，也可以处理异步
const actions = {
  // 通过 api 里面的接口函数调用，向服务器发请求，获取服务器数据
  async getCategoryList({ commit }) {
    let result = await reqGetCategoryList()
    if (result.code === 200) {
      commit('GETCATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取 Floor 组件需要的数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
// mutations: 修改 state 的唯一手段
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
// getters: 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}