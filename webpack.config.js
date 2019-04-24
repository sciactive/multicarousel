const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    MultiCarousel: './src/MultiCarousel.html'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.html'],
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'svelte-loader',
        },
      }
    ],
  },
};
