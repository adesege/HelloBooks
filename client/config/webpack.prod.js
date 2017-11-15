const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const babelMinify = require('babel-preset-minify');
const babelCore = require('babel-core');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true
});

const { ROOT_URL } = process.env;

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: `${ROOT_URL}/`
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    extractSass,
    new MinifyPlugin({
      removeConsole: true,
      removeDebugger: true
    }, {
      comments: false,
      babel: babelCore,
      minifyPreset: babelMinify,
      booleans: true,
      keepFnName: true
    })
  ],
});
