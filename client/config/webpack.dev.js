const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const { PORT } = process.env;

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].js',
    publicPath: `http://localhost:${PORT}/assets/`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    port: PORT,
    publicPath: `http://localhost:${PORT}/assets/`,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:5000'
    },
    overlay: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  }
});
