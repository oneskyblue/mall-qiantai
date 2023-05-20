const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 关闭 eslint
  lintOnSave: false,

  // 项目打包时去掉map文件
  productionSourceMap: false,

  devServer: {
    // 项目运行自动打开浏览器
    host: 'localhost',
    port: 8080,

    // 代理服务器，解决跨域问题
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
