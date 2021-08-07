module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // This will forward any request that does not match a static file to localhost:3000
    proxy: 'http://localhost:3000'
  }
}
