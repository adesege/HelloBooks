const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const { PORT } = process.env;

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].js',
    publicPath: `http://localhost:${PORT}/`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    host: '0.0.0.0',
    port: PORT,
    publicPath: `http://localhost:${PORT}/`,
    historyApiFallback: true,
    hot: true,
    proxy: [{
      context: ['/api', '/docs'],
      target: 'http://0.0.0.0:5000',
    }],
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
