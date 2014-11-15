"use strict";
var React = require('react');

var Header = require('./Header');
var NameList = require('./NameList');
var Filters = require('./Filters');

var App = React.createClass({

    render() {
        return (
            <div className="app">
                <Header/>
                <Filters/>
                <NameList/>
                <div className="footer"/>
            </div>
        );
    }
});

module.exports = App;
