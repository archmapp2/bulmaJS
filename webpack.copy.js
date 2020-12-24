// https://chocolat5.com/tips/webpack-html-template/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyFilePlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
// write-file-webpack-pluginを入れることで、debug時に、実際のdistディレクトリにも書き出されるようになります。
// webpack-dev-server を使用しながらビルドした Javascriptファイルを静的に書き出してくれる プラグイン write-file-webpack-plugin

// const IS_DEV = process.env.NODE_ENV === 'dev';
// console.log(
//   '🚀 ~ file: webpack.config.js ~ line 4 ~ process.env.NODE_ENV',
//   process.env.NODE_ENV
// );

module.exports = {
  entry: {
    common: './src/js/common.js',
    index: './src/js/index.js',
  },
  // mode: IS_DEV,
  plugins: [
    new HtmlWebpackPlugin({
      // HTML documentのtitle
      title: 'Home',
      template: './src/index.html',
      // <script>タグはbody終了タグの直前で読み込む
      inject: true,
      // JSファイルなどにハッシュが付く（キャッシュ対策）
      hash: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Page A',
      template: './src/page.html',
      inject: true,
      filename: 'page.html',
      // 指定したchunkのみを含める chunks: ['含めるentryの名前を記述'] か
      // 指定したchunkを除外する excludeChunks: ['除外するentryの名前を記述'] のどちらかをオプションに記述します。
      chunks: ['common'],
      hash: true,
    }),

    // https://tadtadya.com/webpack4-error-of-version-up-of-copywebpackplugin/
    new CopyFilePlugin({
      patterns: [
        {
          context: './src/js',
          from: '**/*.json',
          to: './js',
          // globOptions: {
          //   dot: false, // .***のファイルは除外
          //   gitignore: false, // falseじゃないとエラーになる。
          //   ignore: [
          //     '**/test/**', // test配下のhtmlは除外
          //     '**/sample.html', // sample.htmlは除外
          //   ],
          // },
        },
      ],
    }),
    new WriteFilePlugin()
  ],
  output: {
    // http://localhost:8081/assets/js/index.min.js
    // http://localhost:8081/assets/js/common.min.js
    filename: 'assets/js/[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
