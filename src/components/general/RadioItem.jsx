var React = require('react');


var RadioItem = React.createClass({
    renderRadio() {
        var icon = (this.props.active) ? 'fa fa-dot-circle-o' : 'fa fa-circle-o';
        return <i className={icon}/>;
    },
    render() {
        return (
            <li
             onClick={(!this.props.active) ? this.props.activate : undefined}
             className="radio-button-item">
                {this.renderRadio()}
                <span>{this.props.annotation}</span>
            </li>
        );
    }
});

module.exports = RadioItem;
