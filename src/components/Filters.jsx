require('./Filters.scss');
var React = require('react');
var GenderLanguageFilter = require('./GenderLanguageFilter');
var RankFilter = require('./RankFilter');
var SectionHeader = require('./general/SectionHeader');

var Filters = React.createClass({
    render() {
        return (
            <div className="filters">
                <SectionHeader align="right">
                    Filters
                </SectionHeader>
                <GenderLanguageFilter/>
                <RankFilter/>
            </div>
        );
    }
});

module.exports = Filters;
