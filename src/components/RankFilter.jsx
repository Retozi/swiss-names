var React = require('react');
var GreyBox = require('./general/GreyBox');
var RangeSlider = require('./general/RangeSlider');
var FilterActions = require('../actions/FilterActions');
var FilteredNamesStore = require('../stores/FilteredNamesStore');

function getFilterState() {
    return FilteredNamesStore.getFilterState();
}

var RankFilter = React.createClass({
    mixins: [FilteredNamesStore.mixin],
    getInitialState() {
        return getFilterState();
    },
    onChange() {
        this.setState(getFilterState());
    },
    onNewSlide(boundary, value) {
        FilterActions.setRankFilter('newRank', boundary, value);
    },
    render() {
        return (
            <GreyBox>
                <RangeSlider
                 startValue={this.state.newRank[0]}
                 endValue={this.state.newRank[1]}
                 onSlide={this.onNewSlide}/>
            </GreyBox>
        );
    }
});


module.exports = RankFilter;
