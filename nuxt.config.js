import colors from 'vuetify/es5/util/colors'
const {
  APP_URL,
} = process.env;

export default {
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Supernova Daily Log',
    title: 'Daily Log App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'author', content: 'unjustorono' },
      { property: 'og:locale', content: 'en_US' },
      {
        hid: 'title',
        name: 'title',
        content: 'Daily Log Application',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Supernova Daily Log Application.',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${APP_URL}`,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Daily Log Application',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Daily Log Application',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Supernova Daily Log Application.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        itemprop: 'image',
        content: `${APP_URL}spn-icon.png`,
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '500',
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '500',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Daily Log Application',
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/webp',
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: `${APP_URL}`,
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Daily Log Application',
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Supernova Daily Log Application.',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${APP_URL}spn-icon.png`,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/spn-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&display=swap' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/utilities.js',
    // { src: '@/plugins/axios', ssr: true },
  ],

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
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://api.fas.pluginesia.com/',
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#22b9b5',
          accent: '#633d92',
          secondary: '#496d9f',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#22b9b5',
          accent: '#633d92',
          secondary: '#496d9f',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', 'defu'],
    publicPath: '',
    extractCSS: {
      ignoreOrder: true
    },
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
}
