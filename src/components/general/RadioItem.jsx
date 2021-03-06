require('./RadioItem.scss');
var React = require('react');


var RadioItem = React.createClass({
    renderRadio() {
        var icon = (this.props.active) ? 'fa fa-dot-circle-o' : 'fa fa-circle-o';
        return <i className={icon}/>;
    },
    render() {
        return (
            <li
             onClick={this.props.onClick}
             data-active={this.props.active}
             className="radio-button-item">
                {this.renderRadio()}
                <span className="radio-button-item-text">{this.props.annotation}</span>
            </li>
        );
    }
});

module.exports = RadioItem;
