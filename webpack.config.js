const combineLoaders = require('webpack-combine-loaders');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: [
    './index.js',
  ],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'client'),
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        ],
      },
    ],
  },
};
