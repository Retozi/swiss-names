var React = require('react');
var GreyBox = require('./general/GreyBox');
var RangeSlider = require('./general/RangeSlider');
var FilterActions = require('../actions/FilterActions');


var RankFilter = React.createClass({
    onNewSlide(boundary, value) {
        FilterActions.setRankFilter('newRank', boundary, value);
    },
    render() {
        return (
            <GreyBox>
                <RangeSlider onSlide={this.onNewSlide}/>
            </GreyBox>
        );
    }
});


module.exports = RankFilter;
