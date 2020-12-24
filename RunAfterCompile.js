const fse = require('fs-extra');

// webpack plugin は、 compiler を引数として受け取る apply メソッドを持つオブジェクトです。
// compiler や compilation は Tapable を継承していて、 Plugins API に記載されている各所に処理を追加することができます。
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => {
      fse.copySync('./app/assets/images', './dist/assets/images');
      // 'fs-extra'
      // Copy a file or directory. The directory can have contents.
    });
  }
}

  plugins: [
    new RunAfterCompile(),

  ]

