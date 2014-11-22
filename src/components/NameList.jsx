require('./NameList.scss');
var assign = require('lodash-node/modern/objects/assign');
var React = require('react');
var FilteredNamesStore = require('../stores/FilteredNamesStore');
var BoundingRectAware = require('./mixins/BoundingRectAware');
var SectionHeader = require('./general/SectionHeader');

function getState() {
    return FilteredNamesStore.getState();
}

var ELEMENT_HEIGHT = 26;

var NameList = React.createClass({
    mixins: [FilteredNamesStore.mixin, BoundingRectAware],
    getInitialState() {
        return assign({scrollTop: 0}, getState());
    },
    onChange() {
        this.setState(getState());
    },
    setScrollTop(e) {
        this.setState({scrollTop: e.currentTarget.scrollTop});
    },
    getVisibleRange() {
        if (this.state.list.length) {
            var start = Math.max((Math.round(this.state.scrollTop  / ELEMENT_HEIGHT) - 5), 0);
            var naiveEnd = start + Math.round(this.height() / ELEMENT_HEIGHT) + 10;
            var end = Math.min(naiveEnd, this.state.list.length - 1);
            return [start, end];
        }
        return [0, 0];
    },
    renderNames() {
        var range = this.getVisibleRange();
        return this.state.list.slice(range[0], range[1]).map((item, i) => {
            return (
                <div
                 className="namelist-item"
                 key={i}
                 style={{top: (range[0] + i) * ELEMENT_HEIGHT}}>
                    {item.name}
                </div>
            );
        });
    },
    render() {
        return (
            <div className="namelist" onScroll={this.setScrollTop} ref="boundingRectTarget">
                <SectionHeader align="left">
                    Names
                </SectionHeader>
                <div
                 className="names-container"
                 style={{height: ELEMENT_HEIGHT * this.state.list.length}}>
                    {this.renderNames()}
                </div>
            </div>
        );
    }
});

module.exports = NameList;
