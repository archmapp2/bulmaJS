// https://runebook.dev/ja/docs/webpack/guides/asset-modules

アセットモジュール
アセットモジュールは、追加のローダーを設定することなく、アセットファイル(フォント、アイコンなど)を使用できるようにするモジュールの一種です。

webpack 5以前は一般的に使用されていました。

raw-loader to import a file as a string
url-loader to inline a file into the bundle as a data URI
file-loader to emit a file into the output directory
アセットモジュールタイプは、4つの新しいモジュールタイプを追加することで、これらのローダーのすべてを置き換えます。

asset/resource は別のファイルを発行し、URLをエクスポートします。以前は、 file-loader を使用して実現できました。
asset/inline はアセットのデータURIをエクスポートします。以前は、 url-loader を使用して実現できました。
asset/source は、アセットのソースコードをエクスポートします。以前は raw-loader を使用して実現できました。
asset は、データURIをエクスポートするか、別のファイルを発行するかを自動的に選択します。以前は、アセットサイズ制限付きの url-loader を使用して実現できました。
When using the old assets loaders (i.e. file-loader / url-loader / raw-loader ) along with Asset Module in webpack 5, you might want to stop Asset Module from processing your assets again as that would result in asset duplication. This can be done by setting asset's module type to 'javascript/auto' .


[webpack-dev-server]
webpack-dev-server serves bundled files from the directory defined in output.path, i.e., files will be available under http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename].

Warning
webpack-dev-server doesn't write any output files after compiling. Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path. If your page expects to find the bundle files on a different path, you can change this with the publicPath option in the dev server's configuration.


https://webpack.js.org/guides/code-splitting/

[Code Splitting]
・Entry Points: Manually split code using entry configuration.
・Prevent Duplication: Use Entry dependencies or SplitChunksPlugin to dedupe and split chunks.
・Dynamic Imports: Split code via inline function calls within modules.

・Prevent Duplication
Entry dependencies
The dependOn option allows to share the modules between the chunks:

 entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
   },

If we're going to use multiple entry points on a single HTML page, optimization.runtimeChunk: 'single' is needed too, otherwise we could get into trouble described here.

  optimization: {
    runtimeChunk: 'single',
  },
  --> runtime.bundle.js
  ...


  SplitChunksPlugin
  The SplitChunksPlugin allows us to extract common dependencies into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the lodash dependency from the previous example:

  ptimization: {
     splitChunks: {
       chunks: 'all',
     },
   },


・Dynamic Imports

Two similar techniques are supported by webpack when it comes to dynamic code splitting. The first and recommended approach is to use the import() syntax that conforms to the ECMAScript proposal for dynamic imports. The legacy, webpack-specific approach is to use require.ensure. Let's try using the first of these two approaches...

  function getComponent() {
    const element = document.createElement('div');

    return import('lodash')
      .then(({ default: _ }) => {
        const element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
      })
      .catch((error) => 'An error occurred while loading the component');
  }

  getComponent().then((component) => {
    document.body.appendChild(component);
  });


As import() returns a promise, it can be used with async functions. Here's how it would simplify the code:

  async function getComponent() {
   const element = document.createElement('div');
    const { default: _ } = await import('lodash');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }

  getComponent().then((component) => {
    document.body.appendChild(component);
  });


Prefetching/Preloading modules



[Caching]

Output Filenames
We can use the output.filename substitutions setting to define the names of our output files. webpack provides a method of templating the filenames using bracketed strings called substitutions. The [contenthash] substitution will add a unique hash based on the content of an asset. When the asset's content changes, [contenthash] will change as well.

  filename: '[name].[contenthash].js',



