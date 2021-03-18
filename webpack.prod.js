const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // インストールの必要なし
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',

	output: {
		filename: '[name].[contentHash].bundle.js',
		path: path.resolve(__dirname, 'docs'),
	},

	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(), // 再び、jsファイルをコンパクト化
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
			// about.html等も必要に応じて、追加する。
			// 恐らく、pluginsと同様に配列で処理できる。
		],
	},
	plugins: [
		///
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
		// "clean-webpack-plugin": "^3.0.0"
		// new CleanWebpackPlugin({
		//   dry: true,
		//   cleanAfterEveryBuildPatterns: ['docs'],
		// }),
		// new HtmlWebpackPlugin({
		//   filename: 'index.html',
		//   template: './src/index.html',
		// }),
		// new HtmlWebpackPlugin({
		//   filename: './sub/js.html',
		//   template: './src/sub/js.html',
		// }),
		// new HtmlWebpackPlugin({
		//   filename: './sub/hbs.html',
		//   template: './src/sub/hbs.html',
		// }),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, //3. Extract css into files ///
					'css-loader', //2. Turns css into commonjs
					'sass-loader', //1. Turns sass into css
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
				],
			},
		],
	},
})
