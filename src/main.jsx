"use strict";

require('normalize.css/normalize.css');
require('./scss/global.scss');


var React = require('react');
var App = require('./components/App');

React.render(
    <App/>,
    document.getElementById('app-container')
);
