require('./SectionHeader.scss');
var React = require('react');


var SectionHeader = React.createClass({
    propTypes: {
        align: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="section-header" data-align={this.props.align}>
                <h2>{this.props.children}</h2>
            </div>
        );
    }
});

module.exports = SectionHeader;
