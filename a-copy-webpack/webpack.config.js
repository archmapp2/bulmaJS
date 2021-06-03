const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyFilePlugin = require('copy-webpack-plugin')

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
		main: './src/index.js',
	},

	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		before: function (app, server) {
			server._watch('./src/sub/**/*.html')
		},
		// contentBase: 'dist',
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		port: 3000,
		// host: '0.0.0.0',
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
		new webpack.ProvidePlugin({
			$$: './src/js/shortJS.js',
		}),

		new CopyFilePlugin({
			patterns: [
				{
					context: './src/js',
					from: '**/*.*',
					to: './src/js',
				},
				{
					context: './src/assets',
					from: '**/*.*',
					to: './src/assets',
				},
			],
		}),
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
		],
	},
}
