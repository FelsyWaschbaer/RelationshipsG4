var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const StanfordCoreNLPClient = require('../middelwares/StanfordCoreNLPClient');
var jsonQuery = require('json-query');

var jsonObj = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources') + '/relationships-testData.json', 'utf8'));
var testComposer = "Bach";

// get corefs
var corefs = filterCorefs(jsonObj, testComposer);
console.log(corefs);

// now find the relations
corefs.forEach(function(coref) {

});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(JSON.stringify(data));
});


module.exports = router;

// get the corefs for the given search text
function filterCorefs(jsonObj, searchText) {
    // 1) get corefs keys
    var data = jsonQuery('corefs[**][*text = ' + searchText + ']', {
        data: jsonObj
    });
    var corefsValuesLengths = Object.values(jsonObj.corefs).map(x => x.length);
    var corefKeys = [];
    data.key.forEach(function(objectIndex) {
        var corefKeyIndex = 0;
        while (objectIndex + 1 > corefsValuesLengths[corefKeyIndex]) {
            objectIndex -= corefsValuesLengths[corefKeyIndex];
            corefKeyIndex++;
        }
        var corefKey = Object.keys(jsonObj.corefs)[corefKeyIndex];
        if (corefKeys.indexOf(corefKey) == -1) {
            corefKeys.push(corefKey);
        }
    });

    // 2) get corefs
    var corefs = corefKeys.map(key => jsonObj.corefs[key]);

    // 3) flatten array
    corefs = [].concat.apply([], corefs);

    return corefs;
}