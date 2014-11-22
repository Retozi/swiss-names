var mcFly = require('../flux/mcFly');
var NamesListStore = require('./NameListStore');
var assign = require('lodash-node/modern/objects/assign');


function updateFullList() {
  var list = NamesListStore.getList();
  assign(_state, {fullList: list, length: list.length});
}

var _state = {
    fullList: [],
    list: []
};

var _filterState = {
    'newRank': [null, null]
};

function updateRankFilter(period, boundary, percentValue) {
    var index = (boundary === 'start') ? 0 : 1;
    var rank = _filterState[period].slice();
    rank[index] = (1 - percentValue) * (_state.fullList.length - 1);
    _filterState[period] = rank;
}


function rankFilterFun(attr) {
    return function(item) {
        var passes = true;
        if (_filterState[attr][0] !== null && item[attr] > _filterState[attr][0]) {
            passes = false;
        }
        if (_filterState[attr][1] !== null && item[attr] < _filterState[attr][1]) {
            passes = false;
        }
        return passes;
    };
}


function calculateFilteredList() {
    var list = [];
    _state.fullList.forEach((item) => {
        if (rankFilterFun('newRank')(item)) {
            list.push(item);
        }
    });
    _state.list = list;
}

var FilteredNamesStore = mcFly.createStore({
    getState() {
        return _state;
    },
    getFilterState() {
        return _filterState;
    }
}, function(payload) {
    mcFly.dispatcher.waitFor([NamesListStore.getDispatchToken()]);
    switch(payload.actionType) {
        case 'SET_AGGREGATE_DATA':
            updateFullList();
            break;
        case 'SWITCH_GENDER':
            updateFullList();
            break;
        case 'SET_LANGUAGES':
            updateFullList();
            break;
        case 'SET_RANK_FILTER':
            updateRankFilter(payload.period, payload.boundary, payload.percentValue);
            break;
        default:
            return true;
      }
      calculateFilteredList();
      FilteredNamesStore.emitChange();
      return true;

});

module.exports = FilteredNamesStore;
