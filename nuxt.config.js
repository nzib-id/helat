import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Event Organizer',
    title: 'EO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-toast-notification.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': {
      target: 'https://event.pinisi.io',
      pathRewrite: {
        '^/api': '/',
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    header: {
      common: {
        Accept:
          'application/json, text/plain, application/x-www-form-urlencoded, */*',
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {},
    },
  },

  loading: false,

  router: {
    middleware: ['auth'],
  },
  auth: {
    redirect: {
      login: '/login',
      home: '/',
      logout: '/login',
    },
    strategies: {
      local: {
        tokenRequired: true,
        token: {
          name: 'Authorization',
          property: 'access_token',
          type: 'Bearer',
          required: true,
          global: true,
          maxAge: 1800,
        },
        endpoints: {
          login: {
            url: '/api' + '/auth/access-token',
            method: 'post',
          },
          logout: { url: '/api' + '/auth/access-token', method: 'post' },
          user: { url: '/api' + '/users/me', method: 'get' },
          candidates: { url: '/api' + '/candidates/', method: 'get' },
        },
        user: {
          property: false,
          autoFetch: true,
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#EB4335',
          accent: '#FFFFFF',
          secondary: '#A4A4A4',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#16C098',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
