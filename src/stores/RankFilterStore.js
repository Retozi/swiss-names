var mcFly = require('../flux/mcFly');
var assign = require('lodash-node/modern/objects/assign');
var NamesStore = require('./NamesStore');

function clearedRankFilter() {
    return {
        'percentRange': [0, 1],
        'rankRange': [NamesStore.getList().length, 0]
    };
}

function clearedFilters() {
    return {
        'newRank': clearedRankFilter(),
        'midRank': clearedRankFilter(),
        'oldRank': clearedRankFilter()
    };
}


var _state = clearedFilters();

function resetFilter() {
    _state = clearedFilters();
}

function copyPeriod(period) {
    return {
        percentRange: _state[period].percentRange.slice(),
        rankRange: _state[period].rankRange.slice()
    };
}

function rankFromPercentage(percentValue) {
    return Math.round((1 - Math.sqrt(percentValue)) * (NamesStore.getList().length));
}

function updateRankFilter(period, boundary, percentValue) {
    var index = (boundary === 'start') ? 0 : 1;
    var newFilter = copyPeriod(period);

    newFilter.percentRange[index] = percentValue;
    newFilter.rankRange[index] = rankFromPercentage(percentValue);

    var updates = {};
    updates[period] = newFilter;
    assign(_state, updates);
}

function biggerAsStart(period, item) {
    return _state[period][0] !== null && item[period] > _state[period].rankRange[0];
}

function smallerAsEnd(period, item) {
    return _state[period][1] !== null && item[period] < _state[period].rankRange[1];
}

function rankFilterFun(period) {
    return function(item) {
        if (biggerAsStart(period, item) || smallerAsEnd(period, item)) {
            return false;
        }
        return true;
    };
}

var RankFilterStore = mcFly.createStore({
    getState() {
        return _state;
    },
    itemPassesFilter(item) {
        if (!rankFilterFun('newRank')(item)) {
            return false;
        }
        if (!rankFilterFun('midRank')(item)) {
            return false;
        }
        if (!rankFilterFun('oldRank')(item)) {
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
        case 'SET_RANK_FILTER':
            updateRankFilter(payload.period, payload.boundary, payload.percentValue);
            break;
        default:
            return true;
      }
      RankFilterStore.emitChange();
      return true;

});

module.exports = RankFilterStore;
