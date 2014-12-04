"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./makeWebpackConfig')('dev');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

/**
* this is a proxy to the wepack dev server. It is not needed
* in this project but is an example on how to provide correct routing
* for the dev server
* see http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router/26218192#26218192
*/
var app = express();
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


var server = new WebpackDevServer(webpack(config), {
    // webpack-dev-server options
    contentBase: __dirname,

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",

    stats: { colors: true }
});

server.listen(8081, "localhost", function() {});
app.listen(8080);
