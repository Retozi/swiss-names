var React = require('react');
var Block = require('./general/Block');
var RangeSlider = require('./general/RangeSlider');
var FilterActions = require('../actions/FilterActions');
var RankFilterStore = require('../stores/RankFilterStore');

var PeriodRankFilter = React.createClass({
    onNewSlide(boundary, value) {
        FilterActions.setRankFilter(this.props.period, boundary, value);
    },
    render() {
        var p = this.props[this.props.period];
        return (
            <RangeSlider
             start={p.percentRange[0]}
             end={p.percentRange[1]}
             startValue={p.rankRange[0] + 1}
             endValue={p.rankRange[1] + 1}
             onSlide={this.onNewSlide}/>
        );
    }
});



var RankFilter = React.createClass({
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


module.exports = RankFilter;
