import stroage from '@/utils/stroage'
import { login, getCaptch } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    uid: '',
    isLogin: stroage.getItem('isLogin') || false,
    userInfo: stroage.getItem('userInfo') || {},
    token: stroage.getItem('token') || '',
    noReadNum: 1
  },
  mutations: {
    // 设置UID
    SET_UID (state, value) {
      state.uid = value
    },
    // 设置用户信息
    SET_USERINFO(state, value) {
      state.userInfo = value
      stroage.setItem('userInfo', value)
    },
    // 设置登录状态
    SET_LOGIN(state, value) {
      state.isLogin = value
      stroage.setItem('isLogin', value)
    },
    // 设置TOKEN
    SET_TOKEN(state, value) {
      state.token = value
      stroage.setItem('token', value)
    },
    // 设置未读消息数
    SET_NO_READ_MESSAGE(state, value) {
      state.noReadNum = value
    }
  },
  actions: {
    // 获取图片验证码
    getCaptcha({ state, commit }) {
      const uid = state.uid || localStorage.getItem('uid') || uuidv4()
      commit('SET_UID', uid)
      return new Promise((resolve, reject) => {
        getCaptch({
          uid
        }).then(res => {
          if (!localStorage.getItem('uid')) {
            localStorage.setItem('uid', uid)
          }
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    login({ commit, state }, form) {
      return new Promise((resolve, reject) => {
        login({
          ...form,
          uid: state.uid
        }).then(res => {
          commit('SET_USERINFO', res.data.userInfo)
          commit('SET_LOGIN', true)
          commit('SET_TOKEN', res.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
