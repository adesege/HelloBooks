const path = require('path');

module.exports={
    externals: {
        'express': 'commonjs express'
    },
    entry: './server/server.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'template/assets/js/')
    },
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
        }
        ]
    }
};
