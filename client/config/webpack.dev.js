const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const dotEnvWebpack = require('dotenv-webpack');
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
          limit: 300000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 300000,
          name: 'fonts/[name].[ext]'
        }
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    port: PORT,
    publicPath: `http://localhost:${PORT}/`,
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
    new webpack.HotModuleReplacementPlugin(),
    new dotEnvWebpack({
      path: path.resolve(__dirname, '../.env'), // Path to .env file (this is the default)
    })

  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  }
});
