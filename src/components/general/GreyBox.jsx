
var React = require('react');

var GreyBox = React.createClass({
    render() {
        return (
            <div className="grey-box">
                <div className="grey-box-header">
                </div>
                <div className="grey-box-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = GreyBox;
