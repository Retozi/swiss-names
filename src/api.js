var ApiActions = require('./actions/ApiActions');

require.ensure([], () => {
    var male = require('json!../assets/aggregate-M.json');
    var female = require('json!../assets/aggregate-F.json');
    ApiActions.setAggregateData(male, female);
});
