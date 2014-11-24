var React = require('react');
var Block = require('./general/Block');
var RangeSlider = require('./general/RangeSlider');
var Filter = require('./general/Filter');
var FilterActions = require('../actions/FilterActions');
var RankFilterStore = require('../stores/RankFilterStore');

var RANGES = {
    newRank: '2000 - 2014',
    midRank: '1980 - 1999',
    oldRank: '1925 - 1979'
};

var PeriodRankFilter = React.createClass({
    onNewSlide(boundary, value) {
        FilterActions.setRankFilter(this.props.period, boundary, value);
    },
    render() {
        var p = this.props[this.props.period];
        return (
            <Filter caption={`Rank-range ${RANGES[this.props.period]}`}>
                <RangeSlider
                 start={p.percentRange[0]}
                 end={p.percentRange[1]}
                 startValue={p.rankRange[0] + 1}
                 endValue={p.rankRange[1] + 1}
                 onSlide={this.onNewSlide}/>
            </Filter>
        );
    }
});



var OtherFilter = React.createClass({
    mixins: [RankFilterStore.mixin],
    getInitialState() {
        return RankFilterStore.getState();
    },
    onChange() {
        this.setState(RankFilterStore.getState());
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


module.exports = OtherFilter;
