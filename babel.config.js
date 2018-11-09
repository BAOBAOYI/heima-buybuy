module.exports = {
  presets: [
    '@vue/app'
  ],
  //在这里导入局部的Affix
  "plugins": [["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }],
  [
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    },
  ]
]
}
