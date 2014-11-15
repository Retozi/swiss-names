"use strict";

var async = require('async');
var request = require('superagent');
var fs = require('fs');

var NEW_THRESH = 2000;
var MIDDLE_THRESH = 1980;


var REGIONS = {
    'Deutsches Sprachgebiet': 'de',
    'Französisches Sprachgebiet': 'fr',
    'Italienisches Sprachgebiet': 'it',
    'Rätoromanisches Sprachgebiet': 'ro'
};

function chunk(array, chunksize) {
    var res = [];
    for (var i = 0; i < array.length; i+=chunksize) {
        res.push(array.slice(i, i + chunksize));
    }
    return res;
}

function arrayToStr(a) {
    return '["' + a.join('","') + '"]';
}

function get() {
    return request.get('http://cubecore.yoocos.com/api/default/query');
}

function writeFilesFun(gender) {
    return function writeFiles(data, callback) {
        async.series([
            function(cb) {
                var fileName = './assets/detail-' + gender + '.json';
                fs.writeFile(fileName, JSON.stringify(data.detail), function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var fileName = './assets/aggregate-' + gender + '.json';
                fs.writeFile(fileName, JSON.stringify(data.aggregate), function(err) {
                    cb(err, null);
                });
            }
        ], function(err) {
            callback(err, null);
        });
    };
}

function addToDetailData(i, res) {
    if (!res[i.Vornamen]) {
        res[i.Vornamen] = {};
    }
    var nameObj = res[i.Vornamen];
    var reg = REGIONS[i.Sprachregion];
    if (!nameObj[reg]) {
        nameObj[reg] = [];
    }

    nameObj[reg].push([i.Geburtsjahr, i.value]);
}


function sortYear(a, b) {
    return (a[0] === b[0]) ? 0 : ((a[0] < b[0]) ? -1 : 1);
}

 // assert correct order of the years array, and optimize
 // data structure for size by removing the years
function postprocessDetailData(data) {
    var years = null;
    function getYear(i) {return parseInt(i[0], 10);}
    function getValue(i) {return parseInt(i[1], 10);}

    for (var name in data) {
        if (data.hasOwnProperty(name)) {
            for (var lang in data[name]) {
                if (data[name].hasOwnProperty(lang)) {
                    var sorted = data[name][lang].sort(sortYear);
                    if (!years) {
                        years = sorted.map(getYear);
                    }
                    data[name][lang] = sorted.map(getValue);
                }
            }
        }
    }
    return {
        'names': data,
        'years': years
    };
}

function makeDetailData(results) {
    var res = {};
    // only take data that is not an aggregate
    results.forEach(function(item) {
        if (REGIONS[item.Sprachregion] && item.Geburtsjahr !== 'Total') {
            addToDetailData(item, res);
        }
    });
    return postprocessDetailData(res);
}

function aggregateDatapoint(countObj, item) {
    var y = parseInt(item.Geburtsjahr, 10);
    var val = parseInt(item.value, 10);

    if (y > NEW_THRESH) {
        countObj['new'] += val;
    } else if (y > MIDDLE_THRESH) {
        countObj.mid += val;
    } else {
        countObj.old += val;
    }
}


function addToAggregateData(i, res) {
    if (!res[i.Vornamen]) {
        res[i.Vornamen] = {};
    }
    var nameObj = res[i.Vornamen];
    var reg = REGIONS[i.Sprachregion];
    if (!nameObj[reg]) {
        nameObj[reg] = {
            'old': 0,
            'mid': 0,
            'new': 0
        };
    }
    aggregateDatapoint(nameObj[reg], i);
}


function makeAggregateData(results) {
    var res = {};
    results.forEach(function(item) {
        if (REGIONS[item.Sprachregion] && item.Geburtsjahr !== 'Total') {
            addToAggregateData(item, res);
        }
    });
    return res;
}

function assembleData(results, callback) {
    callback(null, {
        detail: makeDetailData(results),
        aggregate: makeAggregateData(results)
    });
}


function namesCountBatchQuery(names, gender) {
    var query = 'select {0}[all][all][all] from px-x-Vornamen_{1} in de';
        query = query.replace('{0}', arrayToStr(names));
        query = query.replace('{1}', gender);
        return {query: query, _: 1415214452475};
}


// download full data for all names in batches
function downloadData(names, gender, callback) {
    async.series(chunk(names, 100).map(function(batch, i) {
        return function(cb) {
            get().query(namesCountBatchQuery(batch, gender))
                .end(function(err, res) {
                    console.log("gender batch " + i);
                    cb(err, res.body.result);
                });
        };
    }), function(err, results) {
        // flatten
        var res = [].concat.apply([], results);
        callback(err, res);
    });
}

function filterWantedNames(response) {
    var names = [];
    response.body.result.forEach(function(name) {
        if (parseInt(name.value, 10) > 100) {
            names.push(name.Vornamen);
        }
    });
    return names;
}

function namesRankQuery(gender) {
     var query = "select [all][0][all][all] from px-x-Vornamen_{0} reduce 2 transform vornamenRanking(0,10000) in de";
     query = query.replace('{0}', gender);
     return {query: query, _: 1415214452478};
}


// download names that are more than 100 times in db
function getNameFromServer(gender, callback) {
    get().query(namesRankQuery(gender))
        .end(function(err, res) {
            var names = filterWantedNames(res);
            callback(err, names, gender);
    }) ;
}

module.exports = function(gender) {
    async.waterfall([
        function(callback) {
            callback(null, gender);
        },
        getNameFromServer,
        downloadData,
        assembleData,
        writeFilesFun(gender)
    ]);
};
