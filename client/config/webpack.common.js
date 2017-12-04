const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv');

dotEnv.config();


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body',
  chunksSortMode: function (first, second) {
    if (first.names[0] > second.names[0]) {
      return 1;
    }
    if (first.names[0] < second.names[0]) {
      return -1;
    }
    return 0;
  }
});

const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/common.js',
  minChunks: Infinity,
  chunks: ['loader', 'main']
});

const ProvidePlugin = new webpack.ProvidePlugin({
  'window.Tether': 'tether',
  "Tether": 'tether',
});

const DefinePlugin = new webpack.DefinePlugin({
  "process.env": {
    PORT: JSON.stringify(process.env.PORT),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    APP_CLOUD_NAME: JSON.stringify(process.env.APP_CLOUD_NAME),
    APP_API_KEY: JSON.stringify(process.env.APP_API_KEY),
    APP_API_SECRET: JSON.stringify(process.env.APP_API_SECRET),
    APP_CLOUDINARY_URL: JSON.stringify(process.env.APP_CLOUDINARY_URL),
    AUTH_GOOGLE_CLIENT_ID: JSON.stringify(process.env.AUTH_GOOGLE_CLIENT_ID),
    AUTH_GOOGLE_CLIENT_SECRET: JSON.stringify(process.env.AUTH_GOOGLE_CLIENT_SECRET),
    AUTH_GOOGLE_CALLBACK: JSON.stringify(process.env.AUTH_GOOGLE_CALLBACK),
    AUTH_FACEBOOK_CLIENT_ID: JSON.stringify(process.env.AUTH_FACEBOOK_CLIENT_ID),
    AUTH_FACEBOOK_CLIENT_SECRET: JSON.stringify(process.env.AUTH_FACEBOOK_CLIENT_SECRET),
    AUTH_FACEBOOK_CALLBACK: JSON.stringify(process.env.AUTH_FACEBOOK_CALLBACK),
    DISQUS_SHORT_NAME: JSON.stringify(process.env.DISQUS_SHORT_NAME),
    ROOT_URL: JSON.stringify(process.env.ROOT_URL),
    TIMEZONE: JSON.stringify(process.env.TIMEZONE),
    SOCKET_URL: JSON.stringify(process.env.SOCKET_URL),
    API_VERSION: JSON.stringify(process.env.API_VERSION)
  }
});


module.exports = {
  entry: {
    bsocket: path.resolve(__dirname, '../src/assets/js/socket/index.js'),
    aloader: path.resolve(__dirname, '../src/assets/js/loader/js/loader.js'),
    cmain: path.resolve(__dirname, '../src/index.js')
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      layouts: path.resolve(__dirname, '../src/components/layouts'),
      utils: path.resolve(__dirname, '../src/utils'),
      actions: path.resolve(__dirname, '../src/actions'),
      form: path.resolve(__dirname, '../src/components/form'),
      Modal: path.resolve(__dirname, '../src/components/Modal'),
      components: path.resolve(__dirname, '../src/components'),
      config: path.resolve(__dirname, '../src/config')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
    DefinePlugin
  ],
  stats: {
    colors: true
  },
  node: {
    fs: 'empty'
  }
};
