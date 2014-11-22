require('./Block.scss');
var React = require('react');

var Block = React.createClass({
    render() {
        return (
            <div className="block">
                <div className="block-header">
                </div>
                <div className="block-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Block;
