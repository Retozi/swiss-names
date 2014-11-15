var mcFly = require('../flux/mcFly');

var ApiAction = mcFly.createActions({
    setAggregateData(male, female) {
        return {
            actionType: 'SET_AGGREGATE_DATA',
            data: {
                male: male,
                female: female
            }
        };
    },
});

module.exports = ApiAction;
