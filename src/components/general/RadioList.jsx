var React = require('react');


var RadioListItem = React.createClass({
    renderRadio() {
        var icon = (this.props.active) ? 'fa fa-dot-circle-o' : 'fa fa-circle-o';
        return <i className={icon}/>;
    },
    render() {
        return (
            <li
             onClick={(!this.props.active) ? this.props.activateItem : undefined}
             className="radio-button-item">
                {this.renderRadio()}
                <span>{this.props.annotation}</span>
            </li>
        );
    }
});


var RadioList = React.createClass({
    renderItems() {
        return this.props.items.map((item, i) => {
            return <RadioListItem
                    key={i}
                    active={i === this.props.active}
                    activateItem={() => this.props.activateItem(i)}
                    annotation={item}/>;
        });
    },
    render() {
        return (
            <ol className="radio-button-list">
                {this.renderItems()}
            </ol>
        );
    }
});

module.exports = RadioList;
