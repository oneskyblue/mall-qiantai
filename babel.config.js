module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // elementUI 按需引入的配置
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
