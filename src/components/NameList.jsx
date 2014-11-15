require('./NameList.scss');
var React = require('react');
var FilteredNamesStore = require('../stores/FilteredNamesStore');

function getState() {
    return FilteredNamesStore.getState();
}

var NameList = React.createClass({
    getInitialState() {
        return getState();
    },
    onChange() {
        this.setState(getState());
    },
    render() {
        return (
            <div className="namelist"/>
        );
    }
});

module.exports = NameList;
