export default {
  ssr: true,
  target: 'server',

  head: {
    title: 'NFT Market',
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
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Sora:wght@600&display=swap',
      },
    ],
  },

  css: [{ src: 'aos/dist/aos.css' }],

  plugins: [
    { src: '~/plugins/aos', mode: 'client', ssr: false },
    { src: '~/plugins/vue-kinesis.js', mode: 'client' },
    { src: '~/plugins/vue-number.js', mode: 'client' },
  ],

  components: true,

  buildModules: ['@nuxtjs/style-resources'],

  styleResources: {
    scss: ['@assets/styles/scss/*.scss'],
  },

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/',
  },

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

  build: {},
}
