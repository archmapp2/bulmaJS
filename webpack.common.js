const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyFilePlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  // new webpack.ProvidePlugin({
  //   Handlebars: 'handlebars',
  // }),

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
      {
        context: './src/sub/hbs/partials',
        from: '**/*.*',
        to: './src/sub/hbs/partials',
      },
    ],
  }),

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
  // new WriteFilePlugin(),
];

const sels = require('./fs_getFiles');
const pages = sels
  .filter((fp) => {
    return fp.endsWith('.html');
    // }).map((f) => {
    //   return f.substr(4);
  })
  .map((templ) => {
    // templ: src\sub\js\tabs$$.html
    const f = templ;
    // const f = templ.substr(4); // src\ 以降
    // console.log('f', f);
    return new HtmlWebpackPlugin({
      filename: f,
      template: templ,
    });
  });
plugins.push(...pages);
// console.log('plugins', plugins);

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  plugins: plugins,
  // ].push(pages),

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // {
      //   test: /\.(svg|png|jpg|gif|ico)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(svg|png|jpg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/src/assets/img',
            // outputPath: '/docs/src/assets/img',
          },
        },
      },
    ],
  },
};
