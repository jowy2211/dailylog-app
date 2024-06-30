export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Daily Log Application',
    title: 'Daily Log Application',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Daily Log Application by Supernova Ltd.' },
    ],
    link: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    '@/plugins/dayjs',
    '@/plugins/utilities'
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: '@/components/utilities/loading.vue',

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:3001/',
  },

  middleware: 'auth',

  auth: {
    localStorage: false,
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'api/auth/login', method: 'post' },
          user: { url: 'api/auth/me', method: 'get' },
          logout: { url: 'api/auth/logout', method: 'get' },
        }
      }
    },
    cookie: {
      options: {
        secure: false,
        maxAge: 3600000
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#0E1371',
          accent: '#F1F2FD',
          secondary: '#FFC82F',
          info: '#0559FF',
          warning: '#F79009',
          error: '#F04438',
          success: '#16B364',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  render: {
    csp: {
      addMeta: true,
      policies: {
        'upgrade-insecure-requests': true
      }
    }
  }
}
