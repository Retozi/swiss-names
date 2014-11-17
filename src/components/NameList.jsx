require('./NameList.scss');
var assign = require('lodash-node/modern/objects/assign');
var React = require('react');
var FilteredNamesStore = require('../stores/FilteredNamesStore');

function getState() {
    return FilteredNamesStore.getState();
}

var ELEMENT_HEIGHT = 16;

var NameList = React.createClass({
    mixins: [FilteredNamesStore.mixin],
    getInitialState() {
        return assign({visStart: 0, visEnd: 100}, getState());
    },
    onChange() {
        this.setState(getState());
    },
    renderNames() {
        return this.state.list.slice(this.state.visStart, this.state.visEnd).map((item, i) => {
            var top = (this.state.visStart + i) * ELEMENT_HEIGHT;
            return (
                <div key={item.name} style={{top: top}}>
                    {`${item.name} (${item.totalCount})`}
                </div>
            );
        });
    },
    setVisibleRange(e) {
        var scrollTop = e.currentTarget.scrollTop;
        var height = e.currentTarget.getBoundingClientRect().height;
        this.setState({
            visStart: Math.max(Math.round(scrollTop / ELEMENT_HEIGHT - 5), 0),
            visEnd: Math.min(Math.round((scrollTop + height) / ELEMENT_HEIGHT + 5), this.state.list.length)
        });
    },
    render() {
        return (
            <div className="namelist" onScroll={this.setVisibleRange}>
                <div className="names-container" style={{height: ELEMENT_HEIGHT * this.state.list.length}}>
                    {this.renderNames()}
                </div>
            </div>
        );
    }
});

module.exports = NameList;
