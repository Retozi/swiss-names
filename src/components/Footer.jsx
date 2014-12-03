require('./Footer.scss');
var React = require('react');


var Footer = React.createClass({

    render() {
        return (
            <div className="footer">
                Data Source: <a href="http://www.bfs.admin.ch/">{"http://www.bfs.admin.ch"}</a>
            </div>
        );
    }
});

module.exports = Footer;
