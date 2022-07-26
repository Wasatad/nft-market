export default {
  ssr: true,
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nft-market',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Brand New NFT Market',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Sora:wght@600&display=swa',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['@assets/styles/scss/variables.scss'],
  css: [{ src: 'swiper/css/swiper.css' }, { src: 'aos/dist/aos.css' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-swiper.js', mode: 'client' },
    { src: '~/plugins/aos', mode: 'client' },
    { src: '~/plugins/vue-kinesis.js', mode: 'client' },
    { src: '~/plugins/vue-number.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['@assets/styles/scss/*.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
