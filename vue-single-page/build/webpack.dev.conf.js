const webpack = require("webpack")
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require("webpack-merge");
const utils = require("./utils");
const config = require("../config");
const baseWebpackConfig = require('./webpack.base.conf');

process.env.NODE_ENV = process.env.NODE_ENV || "pre";
console.log("-----------");
console.log(process.env.NODE_ENV);
console.log("-----------");
function resolve (dir) {
  return path.join(__dirname, "..", dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devServer: {
    contentBase: resolve("dist"),
    host: config.dev.host || "localhost",
    port: config.dev.port || 8090,
    open: config.dev.autoOpenBrowser || false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": process.env.NODE_ENV
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve("static"),
        to: "static",
        ignore: ['.*']
      }
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

module.exports = devWebpackConfig;

