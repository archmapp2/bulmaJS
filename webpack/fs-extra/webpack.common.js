const path = require('path');
let webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => {
      fse.copySync('./src/sub', './docs/src/sub');
      fse.copySync('./src/js', './docs/src/js');
      fse.copySync('./src/assets/img', './docs/src/assets/img');
      // 'fs-extra'
      // Copy a file or directory. The directory can have contents.
    });
  }
}

let plugins = [
  // new CleanWebpackPlugin(),
  new webpack.ProvidePlugin({
    handlebars: 'handlebars',
  }),
  new RunAfterCompile(),
];

// const sels = require('./fs_getFiles');
// const pages = sels
//   .filter((fp) => {
//     return fp.endsWith('.html');
//     // }).map((f) => {
//     //   return f.substr(4);
//   })
//   .map((templ) => {
//     // templ: src\sub\js\tabs$$.html
//     const f = templ;
//     // const f = templ.substr(4); // src\ 以降
//     // console.log('f', f);
//     return new HtmlWebpackPlugin({
//       filename: f,
//       template: templ,
//     });
//   });
// plugins.push(...pages);
// console.log('plugins', plugins);

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  plugins: plugins,
  // ].push(pages),

  devServer: {
    // writeToDisk: true,
    // host: '0.0.0.0',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'src/assets/img',
          },
        },
      },
    ],
  },
};
