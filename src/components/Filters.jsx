require('./Filters.scss');
var React = require('react');
var GreyBox = require('./general/GreyBox');
var RadioList = require('./general/RadioList');
var NameListStore = require('../stores/NameListStore');
var FilterActions = require('../actions/FilterActions');


function getFilterState() {
    return NameListStore.getFilterState();
}

var GenderLanguageFilter = React.createClass({
    mixins: [NameListStore.mixin],
    getInitialState() {
        return getFilterState();
    },
    onChange() {
        this.setState(getFilterState());
    },
    render() {
        return (
            <GreyBox>
                <RadioList
                  activateItem={FilterActions.switchGender}
                  items={["Female", "Male"]}
                  active={this.state.gender === "FEMALE" ? 0 : 1}/>
            </GreyBox>
        );
    }
});



var Filters = React.createClass({

    render() {
        return (
            <div className="filters">
                <GenderLanguageFilter/>
            </div>
        );
    }
});

module.exports = Filters;
