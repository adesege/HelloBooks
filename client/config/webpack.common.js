const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv');
const dotEnvWebpack = require('dotenv-webpack');

dotEnv.config();


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
      }
    ]
  },
  plugins: [
    CommonsChunkPlugin,
    HtmlWebpackPluginConfig,
    ProvidePlugin,
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
};
