require('./Filter.scss');
var React = require('react');

var Filter = React.createClass({
    render() {
        return (
            <div className="filter">
                <div className="filter-caption">
                    <h3>{this.props.caption}</h3>
                </div>
                <div className="filter-element">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Filter;
