// https://www.youtube.com/watch?v=JlBDfj75T3Y&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=10

const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    before: function (app, server) {
      server._watch('./src/sub/**/*.html');
    },
    // contentBase: 'docs',
    contentBase: path.join(__dirname, 'docs'),
    hot: true,
    port: 3000,
    // host: '0.0.0.0',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/i,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
    ],
  },
});
