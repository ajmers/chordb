var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
            './src/index.js',
        ],
   },
    output: {
        path: __dirname,
        filename: "chordb.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'chordb',
            filename: 'index.html',
            template: 'src/index.template.ejs',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
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
                loader: 'style!css!sass?' +
                'includePaths[]=' + (path.resolve(__dirname, './node_modules')),
            },
        ],
    },
};
