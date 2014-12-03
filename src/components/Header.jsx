require('./Header.scss');
var React = require('react');


var Header = React.createClass({

    render() {
        return (
            <div className="header">
                <a href="https://github.com/swiss-names/swiss-names.github.io">
                    <i className="fa fa-github fa-3x"/>
                </a>
            </div>
        );
    }
});

module.exports = Header;
