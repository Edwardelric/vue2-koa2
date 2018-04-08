const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	mode: "development",
	entry: {
		app: "./src/main.js",
		vendors: ["vue"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		// libraryTarget: "umd",
		// library: "myLibrary"          // 输出的模块名，方便调用
	},
	target: "web",                      // 使用浏览器的require的方法导入模块 target: "node"  node环境
	resolve: {
		extensions: ['.js', '.vue', '.json'],         // 自动解析
		// enforceExtension: false,                      // 不允许无扩展名文件
		alias: {                                      // 设置别名引用
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		// noParse: /jquery|lodash/,        // 不需要导入一些模块
		// noParse: function(content) {
		// 	return /jquery|lodash/.test(content)
		// },
		rules: [
			{
				test: /\.vue$/,
				use: [
					{ loader: "vue-loader"},
					{ loader: "vue-style-loader"},
					{ loader: "css-loader"},
					{ loader: "sass-loader"}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader"},
					{ loader: "css-loader"},
					{ loader: "sass-loader"}
				]
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		host: "localhost",
		port: 8090,
		open: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
			filename: "index.html"
		})
	]
}