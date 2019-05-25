const {join, resolve} = require('path');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: join(resolve('.'), 'public/'),
    filename: 'ripple.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.d.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {loader: 'ts-loader'},
      },
      {
        test: /\.glsl$/,
        use: {loader: 'raw-loader'},
      },
      {
        test: /\.glsl$/,
        use: {loader: 'glslify-loader'},
      },
    ],
  },
};
