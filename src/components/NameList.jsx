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
        return this.state.list.slice(0, 50).map((item) => {
            return <div key={item.name}>{`${item.name} (${item.totalCount})`}</div>;
        });
    },
    render() {
        return (
            <div className="namelist">
                <div className="names-container" style={{height: 16 * this.state.list.length}}>
                    {this.renderNames()}
                </div>
            </div>
        );
    }
});

module.exports = NameList;
