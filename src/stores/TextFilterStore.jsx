var mcFly = require('../flux/mcFly');
var assign = require('lodash-node/modern/objects/assign');
var NamesStore = require('./NamesStore');

// textPattern not yet implemented
function clearedFilter() {
    return {
        syllables: {
            '1': true,
            '2': true,
            '3': true,
            '>3': true
        },
        textPattern: ''
    };
}

var _state = clearedFilter();

function resetFilter() {
    _state = clearedFilter();
}

function toggleSyllablesCount(number) {
    var newSyllables = assign({}, _state.syllables);
    newSyllables[number] = !newSyllables[number];
    assign(_state, {syllables: newSyllables});
}

var SyllablesFilterStore = mcFly.createStore({
    getState() {
        return _state;
    },
    itemPassesFilter(item) {
        var s = _state.syllables;
        if (!s['1'] && item.syllCount === 1) {
            return false;
        }
        if (!s['2'] && item.syllCount === 2) {
            return false;
        }
        if (!s['3'] && item.syllCount === 3) {
            return false;
        }
        if (!s['>3'] && item.syllCount > 3) {
            return false;
        }
        return true;
    }
}, function(payload) {
    mcFly.dispatcher.waitFor([
        NamesStore.getDispatchToken(),
    ]);
    switch(payload.actionType) {
        case 'SET_AGGREGATE_DATA':
            resetFilter();
            break;
        case 'SWITCH_GENDER':
            resetFilter();
            break;
        case 'TOGGLE_SYLLABLES_COUNT':
            toggleSyllablesCount(payload.number);
            break;
        default:
            return true;
      }
      SyllablesFilterStore.emitChange();
      return true;

});

module.exports = SyllablesFilterStore;
