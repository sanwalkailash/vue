// import colors from 'vuetify/es5/util/colors'

function getNodeApiBase (env) {
  switch (env) {
    case 'production':
      return 'http://localhost:5000'
    case 'staging':
      return 'http://localhost:4000'
    default:
      return 'http://localhost:3000'
  }
}

function getReportBase (env) {
  switch (env) {
    case 'production':
      return 'http://localhost:5500'
    case 'staging':
      return 'http://localhost:4400'
    default:
      return 'http://localhost:3300'
  }
}


function getFileUploadUrl (env) {
  switch (env) {
    default:
      return 'http://localhost:5000/uploads'
  }
}

function getSecretKey (env) {
  switch (env) {
    case 'production':
      return 'abcdef'
    case 'staging':
      return 'abcdef'
    default:
      return 'abcdef'
  }
}

module.exports =  {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - chana',
    title: 'chana',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'organic farms' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  dev: (process.env.NODE_ENV === 'dev') || (process.env.NODE_ENV === 'stage'), // added auto-build step for proxy.
  env: {
    nodeApiBase: getNodeApiBase(process.env.NODE_ENV),
    reportApiBase: getReportBase(process.env.NODE_ENV),
    uploadUrl: getFileUploadUrl(process.env.NODE_ENV),
    secretKey: getSecretKey(process.env.NODE_ENV),
    mainLogoUrl: (process.env.NODE_ENV === 'dev') ? '/favicon.ico' : '/static/v.png',
    staticBase: (process.env.NODE_ENV === 'dev') ? '/' : '/static/',
    idleTimeoutSeconds: 1800,
    idleLogoutSeconds: 90,
    useMockData: true
  },
  serverMiddleware: [
    '~/serverMiddleware/logger.js'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },
  /*
  ** Customize the progress bar color
  */
 loading: { color: '#3B8070' },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|jsx)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true // fix linting issues like spaces.
          }
        })
      }
    }
  }
}
