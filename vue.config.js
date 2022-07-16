const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 修改本地服务器的端口号
    port: 2333
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
  }
})
