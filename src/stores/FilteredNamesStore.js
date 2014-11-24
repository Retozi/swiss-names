var mcFly = require('../flux/mcFly');
var NamesStore = require('./NamesStore');
var RankFilterStore = require('./RankFilterStore');
var assign = require('lodash-node/modern/objects/assign');

var _state = {
    fullList: [],
    list: [],
};

function updateFullList() {
  var list = NamesStore.getList();
  assign(_state, {fullList: list, length: list.length});
}


function calculateFilteredList() {
    var list = [];
    _state.fullList.forEach((item) => {
        if (!RankFilterStore.itemPassesFilter(item)) {
            return;
        }
        list.push(item);
    });
    _state.list = list;
}

var FilteredNamesStore = mcFly.createStore({
    getState() {
        return _state;
    }
}, function(payload) {
    // wait for every store to update, then calculate filter
    mcFly.dispatcher.waitFor([
        NamesStore.getDispatchToken(),
        RankFilterStore.getDispatchToken()
    ]);
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
            break;
        default:
            return true;
      }
      calculateFilteredList();
      FilteredNamesStore.emitChange();
      return true;

});

module.exports = FilteredNamesStore;
