const { defineConfig } = require('@vue/cli-service')
const path = require('path');
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
      extensions: [
        'vue',
        'js',
      ]
    },
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync|lodash|echarts|axios|element-plus)$/,
      rules: [
        {
          test: /\.js[x]?$/,
          use: ['babel-loader'],
          include: [path.resolve(__dirname, 'src')]
        },
      ]
    },
    plugins: [
      // new SpeedMeasurePlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all', // 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
        maxInitialRequests: Infinity, // 按需加载时候最大的并行请求数，默认为5
        minSize: 30000, // 依赖包超过300000bit将被单独打包
        // 缓存组
        // priority: 缓存组打包的先后优先级
        // minChunks: 表示被引用次数，默认为1
        cacheGroups: {
          // 第三方库
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
            reuseExistingChunk: true,
            enforce: true
          },
          elementPlus: {
            name: 'chunk-element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: true
          },
          //公共模块
          commons: {
            name: 'chunk-commons',
            minSize: 100, //大小超过100个字节
            minChunks: 3, //  minimum common number
            priority: 1,
            reuseExistingChunk: true
          },
        }
      }
    }
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

      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  lintOnSave: false, //关闭eslint检查
})
