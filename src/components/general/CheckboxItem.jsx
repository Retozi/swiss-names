var React = require('react');


var CheckboxItem = React.createClass({
    renderRadio() {
        var icon = (this.props.checked) ? 'fa fa-check-square' : 'fa fa-square';
        return <i className={icon}/>;
    },
    render() {
        return (
            <li
             onClick={this.props.onClick}
             className="checkbox-item">
                {this.renderRadio()}
                <span>{this.props.annotation}</span>
            </li>
        );
    }
});

module.exports = CheckboxItem;
