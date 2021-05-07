import constants from '../common/constants'
import apiMock from '../common/mock'
import client from '../http'
export default {
  clearLocalStorage: () => {
    window.localStorage.clear()
  },
  async login ({ commit, state }, { username, password }) {
    try {
      const response = await client.post(`${state.nodeApiBase}/api/v1/authenticate`, { username, password })
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
    const resp = await client.get(url, state.backendAccessConfig)
    return resp.data
  },
  nuxtServerInit: ({ commit }, { env, req }) => {
    const { mainLogoUrl, nodeApiBase, uploadUrl, staticBase, useMockData, internationalization, activeLanguage } = env
    commit('setNodeApiBase', { nodeApiBase })
    commit('setUseMockData', { useMockData })
    commit('setFileUploadUrl', { uploadUrl })
    commit('setMainLogoUrl', { mainLogoUrl })
    commit('setStaticBase', { staticBase })
    commit('setInternationalization', { internationalization })
    commit('setActiveLanguage', { activeLanguage })
    if (req.cookies && req.cookies.auth) {
      commit('setAuthorization', { token: req.cookies.auth })
    }
  }
}
