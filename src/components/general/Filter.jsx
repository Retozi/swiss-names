require('./Filter.scss');
var React = require('react');

var Filter = React.createClass({
    render() {
        return (
            <div className="filter">
                <div className="filter-element">
                    {this.props.children}
                </div>
                <div className="filter-caption">
                    {this.props.caption}
                </div>
            </div>
        );
    }
});

module.exports = Filter;
