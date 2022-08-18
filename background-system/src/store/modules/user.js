import { loginApi, logout, getInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { type } from 'svgo/plugins/cleanupListOfValues'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log(userInfo)
    // const { loginId, loginPwd, captcha, remember } = userInfo
    // const loginInfo = { loginId, loginPwd, captcha, remember }
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const { data } = res
        // console.log(res, typeof res, 'res')
        // console.log(data)
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject(res)
        }
      }).catch(err => {
        // console.log(err, 'err')
        reject(err)
      })
    })
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (typeof res === 'string') {
          // 未登录，或者 token 已经过期
          res = JSON.parse(res)
          if (res.code === 401) {
            reject(res.msg)
          }
        } else {
          // 说明这个 token 是 OK 的，将用户信息放入到仓库
          commit('SET_USER', res.data)
          resolve()
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

