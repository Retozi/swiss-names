var mcFly = require('../flux/mcFly');
var assign = require('lodash-node/modern/objects/assign');

var _state = {};

var SyllablesFilterStore = mcFly.createStore({
    getState() {
        return _state;
    }
}, function(payload) {
    // wait for every store to update, then calculate filter
    switch(payload.actionType) {
        case 'SET_AGGREGATE_DATA':
            break;
        default:
            return true;
      }
      SyllablesFilterStore.emitChange();
      return true;

});

module.exports = SyllablesFilterStore;
