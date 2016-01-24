"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var express = require('express');
var router = express.Router();
var proxy = require('proxy-middleware');
var url = require('url');
var config = require("./webpack.config.js");
var compiler = webpack(config);

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Chord = require('./data/chord');
var dbConfig = require('./config');
//database: 'mongodb://localhost:27017/chordb'
var db = mongoose.createConnection(dbConfig.database);
db.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

if (~process.argv.indexOf('mode_dev')) {
    global.mode_dev = true;
    console.log('Server started in dev mode.');
}

// --------your proxy----------------------
//

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.route('/chords')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        debugger;
        var chord = new Chord();      // create a new instance of the Chord model
        chord.name = req.body.name;

        // save the bear and check for errors
        chord.save(function(err) {
            debugger;
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    })
    .get(function(req, res) {
         Chord.find(function(err, chords) {
            debugger;
            if (err)
                res.send(err);

            res.json(chords);
        });
    });

router.route('/chords/:chord_id')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        debugger;
        res.send({name: 'em', fingerings: []})
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
