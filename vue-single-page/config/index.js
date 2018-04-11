"use strict"

const path = require("path")

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    host: "localhost",
    port: 8090,
    autoOpenBrowser: false,
    cssSourceMap: true,
    proxyTable: {
      "/api/**": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  },
  build: {
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true
  }
}

