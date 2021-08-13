export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  server: {
    port: 8080,
    timing: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'woordenfabriekv2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/globals.css',
    '~/assets/css/styleguide.css',
    '~/assets/css/werkvormen.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: 'https://woordenfabriek.ew.r.appspot.com/V1/',
    browserBaseURL: 'https://woordenfabriek.ew.r.appspot.com/V1/'
    //baseURL: 'http://localhost:3000/V1/',
    //browserBaseURL: 'http://localhost:3000/V1/'
  },

  auth: {
    cookie: false,
    strategies: {
      local: {
          tokenRequired: true,
          endpoints: {
              login: {
                  method: 'POST',
                  url: '/login',
              },
              user: false
          },
      }
    },

  },
  publicRuntimeConfig: {
    baseURL: 'https://woordenfabriek.ew.r.appspot.com/V1',
    //baseURL: 'http://localhost:3000/V1',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
