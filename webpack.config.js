var webpack = require('webpack'),
    path              = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/dev-server',
        './src/index.js',
    ],
    output: {
        path: __dirname,
        filename: "chordb.js",
    },
    resolve: {
        extensions: ['', '.jsx', '.scss', '.js', '.json'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules|vendor)/,
                loaders: ['react-hot', 'babel'],
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
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    require.resolve('sass-loader') + '?sourceMap'
                 ]
            },
        ],
    },
};
