"use strict";
var webpack = require('webpack');

function getEntry(type) {
    var entry = ['./src/main.jsx'];
    //if dev then prepend dev server for autoreload
    if (type === 'dev') {
        entry.unshift('webpack/hot/dev-server');
        entry.unshift('webpack-dev-server/client?http://localhost:8081');
    }
    return entry;
}

function getPlugins(type) {
    var plugins = [];
    if (type === 'dev') {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    } else if (type === 'prod') {
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    return plugins;
}

function getJsxLoaders(type) {
    var loaders = ['jsx?harmony'];
    if (type === 'dev') {
        loaders.unshift('react-hot');
    }
    return loaders;
}

module.exports = function(type) {
    return {
        entry: getEntry(type),
        output: {
            path: __dirname + '/assets',
            filename: 'bundle.js',
            publicPath: "/assets/"
        },
        plugins: getPlugins(type),
        devtool: (type === 'dev') ? "#inline-source-map" : null,
        module: {
            loaders: [
                { test: /\.js.{0,1}$/, loaders: getJsxLoaders(type) },
                { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + __dirname + '/src/scss'},
                { test: /\.css$/, loader: "style!css"}
            ],
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };
};
