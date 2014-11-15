require('./NameList.scss');
var React = require('react');
var FilteredNamesStore = require('../stores/FilteredNamesStore');

function getState() {
    return FilteredNamesStore.getState();
}

var NameList = React.createClass({
    mixins: [FilteredNamesStore.mixin],
    getInitialState() {
        return getState();
    },
    onChange() {
        this.setState(getState());
    },
    renderNames() {
        return this.state.data.map((item) => {
            return <li key={item.name}>{`${item.name} (${item.totalCount})`}</li>;
        });
    },
    render() {
        return (
            <div className="namelist">
                <ul>
                    {this.renderNames()}
                </ul>
            </div>
        );
    }
});

module.exports = NameList;
