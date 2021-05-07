export default {
  setActiveLanguage: (state, payload) => {
    state.activeLanguage = payload.activeLanguage
  },
  setInternationalization: (state, payload) => {
    state.internationalization = payload.internationalization
  },
  setNodeApiBase: (state, payload) => {
    state.nodeApiBase = payload.nodeApiBase
  },
  setUseMockData: (state, payload) => {
    state.useMockData = payload.useMockData
  },
  setFileUploadUrl: (state, payload) => {
    state.uploadUrl = payload.uploadUrl
  },
  setAuthorization: (state, payload) => {
    state.token = payload.token
    state.backendAccessConfig = {
      headers: {
        Authorization: state.token
      }
    }
  },
  setAccountInfo: (state, payload) => {
    state.user = payload.user
  },
  setMainLogoUrl: (state, payload) => {
    state.mainLogoUrl = payload.mainLogoUrl
  },
  setStaticBase: (state, payload) => {
    state.staticBase = payload.staticBase
  }
}
