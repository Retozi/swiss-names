var mcFly = require('../flux/mcFly');

var assign = require('lodash-node/modern/objects/assign');
var ALL_LANGS = ['de', 'it', 'fr', 'ro'];

var MALE = {};
var FEMALE = {};

function makeSortFun(attr) {
    return function(a, b) {
        return (a[attr] === b[attr]) ? 0 : ((a[attr] > b[attr]) ? -1 : 1);
    };
}

function rankData(data) {
    ['oldRank', 'midRank', 'newRank'].forEach((attr) => {
        data.sort(makeSortFun(attr));
        data.forEach((item, i) => {
            item[attr] = i;
        });
    });
    return data;
}


function makeData(langs, gender) {
    // make a copy to be sure!
    var data = assign({}, (gender === 'MALE') ? MALE : FEMALE);
    var res = [];
    for (var name in data) {
        if (data.hasOwnProperty(name)) {
            var item = {name: name, 'oldRank': 0, 'midRank': 0, 'newRank': 0};
            for (var i = 0; i < langs.length; i++) {
                var dataPoint = data[name][langs[i]];
                item.oldRank += dataPoint.old;
                item.midRank += dataPoint.mid;
                item.newRank += dataPoint['new'];
            }
            item.totalCount = item.newRank + item.midRank + item.newRank;
            res.push(item);
        }
    }
    return rankData(res);
}


var _state = {
    gender: 'MALE',
    langs: ALL_LANGS,
    list: []
};

function update(updates) {
    assign(_state, updates);
    _state.list = makeData(_state.langs, _state.gender);
}


var NameListStore = mcFly.createStore({
    getList() {
        return _state.list;
    },
    getFilterState() {
        return {
            gender: _state.gender,
            langs: _state.langs
        };
    }
}, function(payload) {
    switch(payload.actionType) {
        case 'SET_AGGREGATE_DATA':
            MALE = payload.data.male;
            FEMALE = payload.data.female;
            update();
            break;
        case 'SWITCH_GENDER':
            update({gender: (_state.gender === 'MALE') ? 'FEMALE' : 'MALE'});
            break;
        case 'SET_LANGUAGES':
            update({langs: payload.langs});
            break;
        default:
            return true;
    }
    NameListStore.emitChange();
    return true;

});

module.exports = NameListStore;
