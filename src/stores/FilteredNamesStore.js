var mcFly = require('../flux/mcFly');
var NamesListStore = require('./NameListStore');

var _state = {
    data: NamesListStore.getState().list
};

var FilteredNamesStore = mcFly.createStore({
    getState() {
        return _state;
    }
}, function(payload) {
    switch(payload.actionType) {
        case 'COUNT_ONE':
            break;
        default:
            return true;
      }
      FilteredNamesStore.emitChange();
      return true;

});

module.exports = FilteredNamesStore;
