var React = require('react');
var Block = require('./general/Block');
var RangeSlider = require('./general/RangeSlider');
var FilterActions = require('../actions/FilterActions');
var FilteredNamesStore = require('../stores/FilteredNamesStore');


var PeriodRankFilter = React.createClass({
    onNewSlide(boundary, value) {
        FilterActions.setRankFilter(this.props.period, boundary, value);
    },
    getStartValue() {
        var value = this.props[this.props.period][0];
        return (value === null) ? this.props.fullList.length : value + 1;
    },
    getEndValue() {
        var value = this.props[this.props.period][1];
        return (value === null) ? 1 : value + 1;
    },
    render() {
        return (
            <RangeSlider
             startValue={this.getStartValue()}
             endValue={this.getEndValue()}
             onSlide={this.onNewSlide}/>
        );
    }
});



var RankFilter = React.createClass({
    mixins: [FilteredNamesStore.mixin],
    getInitialState() {
        return FilteredNamesStore.getState();
    },
    onChange() {
        this.setState(FilteredNamesStore.getState());
    },
    render() {
        return (
            <Block>
                <PeriodRankFilter period="newRank" {...this.state}/>
                <PeriodRankFilter period="midRank" {...this.state}/>
                <PeriodRankFilter period="oldRank" {...this.state}/>
            </Block>
        );
    }
});


module.exports = RankFilter;
