var React = require('react');

var Filter = React.createClass({
    render() {
        return (
            <div className="filter">
                <div className="filter-caption">
                    {this.props.caption}
                </div>
                <div className="filter-element">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Filter;
