import { reqGetSearchInfo } from '@/api'

// search 模块的小仓库
const state = {
  searchList: {}
}
const actions = {
  // 获取搜索页面（Search 组件）数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    // console.log(result)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// 计算属性
// 项目当中 getters 的主要作用是：简化仓库中的数据
// 可以把将来在组件当中需要用的数据简化一下，这样组件获取数据就方便了
const getters = {
  // 这里的 state 是指 search 模块小仓库中的 state，而不是大仓库中的 state
  attrsList(state) {
    // console.log(state)
    // state.searchList.attrsList 如果服务器数据回来了，是一个数组
    // 如果网络不给力或没有网，state.searchList.attrsList 应该返回的是 undefined
    // 计算属性的属性值至少是一个空数组
    return state.searchList.attrsList || []
  },
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}