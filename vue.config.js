const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
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
})
