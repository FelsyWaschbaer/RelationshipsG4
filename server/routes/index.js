var express = require('express');
var router = express.Router();
const StanfordCoreNLPClient = require('../middelwares/StanfordCoreNLPClient');

const testPhrase = 'Born in Salzburg, he showed prodigious ability from his earliest childhood. Already competent on keyboard and violin, he composed from the age of five and performed before European royalty. At 17, Mozart was engaged as a musician at the Salzburg court, but grew restless and traveled in search of a better position. While visiting Vienna in 1781, he was dismissed from his Salzburg position. He chose to stay in the capital, where he achieved fame but little financial security. During his final years in Vienna, he composed many of his best-known symphonies, concertos, and operas, and portions of the Requiem, which was largely unfinished at the time of his death. The circumstances of his early death have been much mythologized. He was survived by his wife Constanze and two sons. He composed more than 600 works, many acknowledged as pinnacles of symphonic, concertante, chamber, operatic, and choral music. He is among the most enduringly popular of classical composers, and his influence is profound on subsequent Western art music. Ludwig van Beethoven composed his own early works in the shadow of Mozart, and Joseph Haydn wrote: "posterity will not see such a talent again in 100 years".';

//const client = new StanfordCoreNLPClient('http://localhost:9000', 'openie, coref', {"openie.resolve_coref": "true"});
/*
client.annotate(testPhrase)
    .then(result => console.log(JSON.stringify(result, null, 2)));
*/
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('hello MusicConnectionMachine');
});

module.exports = router;
