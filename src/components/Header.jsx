require('./Header.scss');
var React = require('react');


var Header = React.createClass({

    render() {
        return (
            <div className="header">
                <h1>{"Swiss Names"}</h1>
            </div>
        );
    }
});

module.exports = Header;
