const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 修改本地服务器的端口号
    port: 2333,
    // 设置跨域代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' //这里的/其实就是代表根,可以理解为用/api代替target里的地址
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'utils': '@/utils',
        'config': '@/config',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
      },
    },
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        lodash: '_',
        axios: 'axios',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'ElementPlusIconsVue'
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  lintOnSave: false, //关闭eslint检查
})
