const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyFilePlugin = require('copy-webpack-plugin')
console.log(__dirname)

// import * as $$ from './js/shortJS.js'

// new CopyFilePlugin({
//   patterns: [
//     {
//       context: './src',
//       from: '**/*.*',
//       to: './src',
//       globOptions: {
//         dot: false, // .***のファイルは除外
//         gitignore: false, // falseじゃないとエラーになる。
//         ignore: [
//           '**/app/**', // test配下のhtmlは除外
//           '**/css/**', // sample.htmlは除外
//           '*.*',
//         ],
//       },
//     },
//   ],
// }),

module.exports = {
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},

	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},

	devServer: {
		before: function (app, server) {
			server._watch('./src/**/*.*')
			// server._watch('./src/**/*.html')
			// server._watch('./src/**/*.js')
		},
		contentBase: 'dist',
		// contentBase: path.join(__dirname, 'dist'),
		open: true,
		hot: true,
		port: 8080,
		// port: 3000,
		writeToDisk: true,
		// host: '0.0.0.0',
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.ProvidePlugin({
			$$: './js/shortJS.js',
		}),

		// new CopyFilePlugin({
		// 	patterns: [
		// 	],
		// }),
	],

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.(css|scss|sass)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
				type: 'asset/resource',
			},
		],
	},
}
