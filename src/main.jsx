"use strict";

require('./scss/reset.css');
require('./scss/global.scss');


require('./api.js');

var React = require('react');
var App = require('./components/App');

React.render(
    <App/>,
    document.getElementById('app-container')
);
