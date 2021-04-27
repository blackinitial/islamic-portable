const title = 'Islamic Portable'
const description = 'Aplikasi Islami dalam Genggaman'

const getOfflineAssets = () => {
  let res = [
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon-96x96.png',
    '/icon-192x192.png',
    '/icon.png',
    '/data/surah-info.json'
  ]
  for(let i=0; i< 114; i++) {
    res.push(`/data/surah/${i+1}.json`)
  }
  return res
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'theme-color', name: 'theme-color', content: '#DD96F9' },

      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:image', property: 'og:image', content: '/icon.png' },
      { hid: 'og:title', property: 'og:title', content: 'Islamic Portable' },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:url', property: 'og:url', content: 'https://islamic-portable.netlify.com' },

      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:image:src', name: 'twitter:image:src', content: '/icon.png' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Islamic Portable' },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:url', name: 'twitter:url', content: 'https://islamic-portable.netlify.com' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@bl_int' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.',
        body: true
      }
    ]
  },

    /*
   ** Customize the progress-bar color
   */
   loading: { color: "#DD96F9" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/index.less'
    // 'vant/lib/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vant'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Generate multiple entry html from 1 to 114
   generate: {
    routes: () => {
      let res = [
        '/',
        '/quran'
      ]
      for(let i = 0; i < 114; i++) {
        res.push(`/${i+1}`)
        res.push(`/quran/${i}`)
      }
      return res
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Islamic Portable',
      short_name: 'Islamic',
      description,
      theme_color: '#DD96F9',
      background_color: '#ffffff',
      lang: 'id'
    },
    workbox: {
      offlineAssets: getOfflineAssets()
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
     },
   },
  }
}
