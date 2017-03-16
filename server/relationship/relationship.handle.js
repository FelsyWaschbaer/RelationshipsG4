var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../middelwares/StanfordCoreNLPClient');
var jsonQuery = require('json-query');

var jsonObj = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources') + '/relationships-testData.json', 'utf8'));

var testComposer = "Bach 's";
var data = jsonQuery('corefs[**][*text = ' + testComposer + ']', {
    data: jsonObj
});

// get coref keys
var corefKeys = filterCorefKeys(jsonObj, testComposer);

// get corefs
var corefs = corefKeys.map(key => jsonObj.corefs[key]);

// flatten array
corefs = [].concat.apply([], corefs);

// now find the relations
console.log(corefs);
corefs.forEach(function(coref) {

})


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(JSON.stringify(data));
});


module.exports = router;

// get the coref ids for the given search text.
function filterCorefKeys(jsonObj, searchText) {
    var data = jsonQuery('corefs[**][*text = ' + searchText + ']', {
        data: jsonObj
    });
    var corefValues = Object.values(jsonObj.corefs).map(x => x.length);
    var corefKeys = [];
    data.key.forEach(function(key) {
        var index = 0;
        while (key + 1 > corefValues[index]) {
            key -= corefValues[index];
            index++;
        }
        var corefKey = Object.keys(jsonObj.corefs)[index];
        if (corefKeys.indexOf(corefKey) == -1) {
            corefKeys.push(corefKey);
        }
    });
    return corefKeys;
}