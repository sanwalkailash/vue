import axios from 'axios'
import Vuex from 'vuex'
import constants from '../common/constants'
// import util from '../common/util.js'
import apiMock from '../common/mock'

/** Handle all api errors from here **/
const client = axios.create()
client.interceptors.response.use(
  res => res,
  err => {
    throw err.response.data
  })

const createAppStore = () => {
  return new Vuex.Store({
    state: {
      browserName: null,
      token: null,
      backendAccessConfig: null,
      isDev: null,
      nodeApiBase: null,
      useMockData: false,
      staticBase: null,
      userEmail: null,
      user: null,
      loading: false,
      uploadUrl: null
    },
    getters: {
      getBrowserName () {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
          return 'Opera'
        } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
          return 'Chrome'
        } else if (navigator.userAgent.indexOf('Safari') !== -1) {
          return 'Safari'
        } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
          return 'Firefox'
        } else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) {
          return 'IE'
        } else {
          return 'unknown'
        }
      },
      getUserEmail (state) {
        return state.userEmail
      }
    },
    mutations: {
      setNodeApiBase (state, payload) {
        state.nodeApiBase = payload.nodeApiBase
      },
      setUseMockData (state, payload) {
        state.useMockData = payload.useMockData
      },
      setFileUploadUrl (state, payload) {
        state.uploadUrl = payload.uploadUrl
      },
      setAuthorization (state, payload) {
        state.token = payload.token
        state.backendAccessConfig = {
          headers: {
            Authorization: state.token
          }
        }
      },
      setAccountInfo (state, payload) {
        state.user = payload.user
      }
    },
    actions: {
      clearLocalStorage () {
        window.localStorage.clear()
      },
      async login ({ commit, state }, { username, password }) {
        try {
          const response = await axios.post(`${state.nodeApiBase}/api/v1/authenticate`, { username, password })
          commit('setAuthorization', { token: response.data.token })
          commit('setAccountInfo', { user: response.data.user })
          return response.data
        } catch (err) {
          console.error(err)
          throw new Error(`LOGIN FAILED: ${err}`)
        }
      },
      async getListings ({ commit, state }, userId) {
        if (state.useMockData === constants.true) {
          console.info('using api mock', apiMock.getListings)
          return Promise.resolve(apiMock.getListings)
        }
        const url = `${state.nodeApiBase}/v2/pacing/user/${userId}`
        const resp = await axios.get(url, state.backendAccessConfig)
        return resp.data
      },
      nuxtServerInit ({ commit }, { env, req }) {
        const { mainLogoUrl, nodeApiBase, uploadUrl, staticBase, useMockData } = env
        commit('setNodeApiBase', { nodeApiBase })
        commit('setUseMockData', { useMockData })
        commit('setFileUploadUrl', { uploadUrl })
        commit('setMainLogoUrl', { mainLogoUrl })
        commit('setStaticBase', { staticBase })
        if (req.cookies && req.cookies.auth) {
          commit('setAuthorization', { token: req.cookies.auth })
        }
      }
    }
  })
}

export default createAppStore
