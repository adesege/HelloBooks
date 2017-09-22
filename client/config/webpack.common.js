const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv');

dotEnv.config();

const { PORT } = process.env;


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/common.js',
  minChunks: Infinity,
});

const ProvidePlugin = new webpack.ProvidePlugin({
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
  jQuery: 'jquery',
  $: 'jquery',
  'window.Tether': 'tether',
  Tether: 'tether',
});


module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          limit: 300000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          limit: 300000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    CommonsChunkPlugin,
    HtmlWebpackPluginConfig,
    ProvidePlugin,
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  node: {
    fs: 'empty'
  }
};
