const path = require('path');
const webpack = require('webpack');

module.exports={
    externals: {
        'express': 'commonjs express'
    },
    entry: './server/server.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'template/assets/js/'),
        publicPath: 'templates/assets'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            /*compress: {
            warnings: false
        }*/
    })
    ],
    module: {
        rules: [
        {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                presets: ['env']
            }
            }
        },
        {
            test: /.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'client'),
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
                    }
        }
        ]
    }
};
