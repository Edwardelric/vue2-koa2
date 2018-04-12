const webpack = require("webpack")
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const glob = require("glob");
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

let entries = {};
let htmlWebpackPluginArray = [];
let chunks = [];

glob.sync(resolve("./src/pages/**/main.js")).forEach(path => {
  let name = /src\/pages\/(.+)\/main.js/.exec(path)[1];
  entries[name] = path;
  htmlWebpackPluginArray.push(new HtmlWebpackPlugin({
    template: "index.html",
    filename: '../dist/'+name+'/index.html',
    inject: true,
    chunks: [name]
  }))
});

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].js"),
    chunkFilename: utils.assetsPath("js/[id].js"),
    publicPath: process.env.NODE_ENV === "production"
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});


devWebpackConfig.plugins = [...devWebpackConfig.plugins, ...htmlWebpackPluginArray];
module.exports = devWebpackConfig;

