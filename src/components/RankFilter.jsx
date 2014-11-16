var React = require('react');
var GreyBox = require('./general/GreyBox');
var RangeSlider = require('./general/RangeSlider');

var RankFilter = React.createClass({
    render() {
        console.log('render');
        return (
            <GreyBox>
                <RangeSlider/>
            </GreyBox>
        );
    }
});


module.exports = RankFilter;
