const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const glob = require("glob");
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

let prodWebpackConfig = [];

glob.sync(resolve("./src/pages/**/main.js")).forEach(curPath => {
  let pageName = /src\/pages\/(.+)\/main.js/.exec(curPath)[1];
  let entries = {};
  entries[pageName] = curPath;
  
  const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    entry: entries,
    output: {
      path: path.join(config.build.assetsRoot, pageName),
      filename: utils.assetsPath("js/[name].[chunkhash].js"),
      chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
      publicPath: process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true
      })
    },
    plugins: [
      new ExtractTextPlugin({
        filename: utils.assetsPath("[name]/css/[name].css")
      }),
      new HtmlWebpackPlugin({
        template: "index.html",
        filename: path.resolve(__dirname, "../dist/" + pageName + "/index.html"),
        inject: true
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 3,
            name: "commons",
            enforce: true
          }
        }
      }
    }
  });

  prodWebpackConfig.push(webpackConfig)
});

module.exports = prodWebpackConfig;
