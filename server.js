"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var config = require("./webpack.config.js");
var compiler = webpack(config);

if (~process.argv.indexOf('mode_dev')) {
    global.mode_dev = true;
    console.log('Server started in dev mode.');
    debugger;
}

// --------your proxy----------------------
var app = express();
// proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chords', function(req, res) {
    res.send('chords!');
});


// -----your-webpack-dev-server------------------
var wdServer = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/",

    stats: { colors: true }
});

// run the two servers
wdServer.listen(8081, "localhost", function() {});
app.listen(8080);
