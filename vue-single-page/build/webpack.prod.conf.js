const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const merge = require("webpack-merge");
const utils = require("./utils");
const config = require("../config");
const baseWebpackConfig = require("./webpack.base.conf");

process.env.NODE_ENV = "production";
console.log("-----------");
console.log(process.env.NODE_ENV);
console.log("-----------");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: path.resolve(__dirname, '../dist/index.html'),
      inject: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true
        }
      }
    }
  }
})
module.exports = webpackConfig
