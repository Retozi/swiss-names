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
    switch(payload.actionType) {
        case 'SWITCH_GENDER':
            mcFly.dispatcher.waitFor([NamesListStore.getDispatchToken()]);
            updateList();
            break;
        default:
            return true;
      }
      FilteredNamesStore.emitChange();
      return true;

});

module.exports = FilteredNamesStore;
