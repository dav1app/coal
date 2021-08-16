module.exports = {
  experiments: {
    asyncWebAssembly: true,
    buildHttp: true,
    executeModule: true,
    layers: true,
    lazyCompilation: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true
  },
  resolve: {
    fallback: {
      fs: false
    }
  }
}
