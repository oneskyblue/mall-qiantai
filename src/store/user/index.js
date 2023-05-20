// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 这里获取验证码这个接口是把验证码返回，但是在正常情况下后台把验证码发送到用户手机上
    let result = await reqGetCode(phone)
    // console.log(result)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册用户
  async userRegister(_, user) {
    let result = await reqUserRegister(user)
    // console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      // return Promise.reject(new Error('faile'))
      return Promise.reject(new Error(result.message))
    }
  },
  // 登录业务
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // 服务器下发token，用户唯一标识符
    // 将来通常带token找服务器要用户信息进行展示
    // console.log(result)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token，本地存储
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发送一次请求，通知服务器清除token
    let result = await reqUserLogout()
    // console.log(result)
    // actions里面不能操作state，提交mutations修改state
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR() {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}