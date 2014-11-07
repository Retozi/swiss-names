"use strict";

var _ = require('lodash-node');
var request = require('superagent');

function get() {
    return request.get('http://cubecore.yoocos.com/api/default/query');
}

function getNameFromServer(gender) {
    var query = "select [all][0][all][all] from px-x-Vornamen_{0} reduce 2 transform vornamenRanking(0,10000) in de";
    query = query.replace('{0}', gender);
    var id = 1415214452458;

    get().query({query: query, _: id})
        .end(function(res) {
            var names = [];
            res.body.result.forEach(function(name) {
                if (parseInt(name.value, 10) > 100) {
                    names.push(name.Vornamen);
                }
            });
            console.log(names);
    })  ;
}

module.exports = function(gender) {
    getNameFromServer(gender);
};
