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
    }
});

module.exports = FilterActions;
