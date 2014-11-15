var mcFly = require('../flux/mcFly');

var MALE = require('json!../../assets/aggregate-M.json');
var FEMALE = require('json!../../assets/aggregate-F.json');
var ALL_LANGS = ['de', 'it', 'fr', 'ro'];


function makeSortFun(attr) {
    return function(a, b) {
        return (a[attr] === b[attr]) ? 0 : ((a[attr] > b[attr]) ? -1 : 1);
    };
}

function rankData(data) {
    ['old', 'mid', 'new'].forEach((attr) => {
        data.sort(makeSortFun(attr));
        data.forEach((item, i) => {
            item[attr] = i;
        });
    });
    return data;
}


function makeData(langs, gender) {
    var data = (gender === 'MALE') ? MALE : FEMALE;
    var res = [];
    for (var name in data) {
        if (data.hasOwnProperty(name)) {
            var item = {name: name, 'old': 0, 'mid': 0, 'new': 0};
            for (var i = 0; i < langs.length; i++) {
                var l = langs[i];
                item.old += data[name][l].old;
                item.mid += data[name][l].mid;
                item['new'] += data[name][l]['new'];
                item.totalCount = data[name][l].old + data[name][l].mid + data[name][l]['new'];
            }
            res.push(item);
        }
    }
    return rankData(res);
}


var _state = {
    gender: 'MALE',
    langs: ['de', 'it', 'fr', 'ro'],
    list: makeData(ALL_LANGS, 'MALE')
};

var NameListStore = mcFly.createStore({
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
      NameListStore.emitChange();
      return true;

});

module.exports = NameListStore;
