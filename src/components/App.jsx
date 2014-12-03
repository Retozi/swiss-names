"use strict";
require('./App.scss');
var React = require('react');

var Header = require('./Header');
var Footer = require('./Footer');
var NameList = require('./NameList');
var Filters = require('./Filters');

var App = React.createClass({
    render() {
        return (
            <div className="app">
                <Header/>
                <Filters/>
                <NameList/>
                <Footer/>
            </div>
        );
    }
});

module.exports = App;
