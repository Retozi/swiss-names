var mcFly = require('../flux/mcFly');
var NamesListStore = require('./NameListStore');
var assign = require('lodash-node/modern/objects/assign');


function updateList() {
  assign(_state, {data: NamesListStore.getList().slice(0, 100)});
}

var _state = {
    data: NamesListStore.getList().slice(0, 100)
};

var FilteredNamesStore = mcFly.createStore({
    getState() {
        return _state;
    }
}, function(payload) {
    mcFly.dispatcher.waitFor([NamesListStore.getDispatchToken()]);
    switch(payload.actionType) {
        case 'SET_AGGREGATE_DATA':
            updateList();
            break;
        case 'SWITCH_GENDER':
            updateList();
            break;
        case 'SET_LANGUAGES':
            updateList();
            break;
        default:
            return true;
      }
      FilteredNamesStore.emitChange();
      return true;

});

module.exports = FilteredNamesStore;
