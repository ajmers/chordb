var webpack = require('webpack'),
    path              = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules|vendor)/,
                loaders: ['babel'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico|cur)$/i,
                loader: 'file-loader?name=images/[name].[ext]',
            },
            {
                test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.s?css$/i,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
            },
        ],
    },

    entry: {
        app: './src/index.js',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        filename: 'chordb.js',
    },

    devtool: '#source-map',

    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: 'chordb',
            filename: 'index.html',
        }),
    ],

    resolve: {
        root: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },

};
