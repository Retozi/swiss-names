require('./Filters.scss');
var React = require('react');
var GenderLanguageFilter = require('./GenderLanguageFilter');
var RankFilter = require('./RankFilter');

var Filters = React.createClass({
    render() {
        return (
            <div className="filters">
                <GenderLanguageFilter/>
                <RankFilter/>
            </div>
        );
    }
});

module.exports = Filters;
