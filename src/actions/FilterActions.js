var mcFly = require('../flux/mcFly');

var FilterActions = mcFly.createActions({
    switchGender() {
        return {
            actionType: 'SWITCH_GENDER'
        };
    },
    setLanguages(langs) {
        return {
            actionType: 'SET_LANGUAGES',
            langs: langs
        };
    },
    setRankFilter(period, boundary, percentValue) {
        return {
            actionType: 'SET_RANK_FILTER',
            period: period,
            boundary: boundary,
            percentValue: percentValue
        };
    }
});

module.exports = FilterActions;
