var mcFly = require('../flux/mcFly');

var FilterActions = mcFly.createActions({
  switchGender() {
    return {
      actionType: 'SWITCH_GENDER'
    };
  }
});

module.exports = FilterActions;
