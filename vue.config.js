const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "node_modules/bootstrap/scss/bootstrap";
        `
      }
    }
  },

  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/svg-sprite',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'assets/sprite.[hash:8].svg'
      },
      pluginOptions: {
        plainSprite: true
      }
    },
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
})
