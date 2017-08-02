
const path = require('path');

module.exports = {
  entry: {
    app: './server/server.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'client')
  }
};
