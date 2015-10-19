

var request = require('request');
var cheerio = require('cheerio');

var memberids = ['188506734', '172023162', '191514653'];

/*getMemberName_P('172023162').then(function (name) {
    console.log(name);
});*/

Promise.all(memberids.map(getMemberName_P)).then(function (names) {
    console.log(names);
});

function getMemberName_P(memberid) {
    return new Promise(function (resolve, reject) {
        getName(memberid, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        })
    });
}

function getName(memberid, callback) {
    request('http://www.meetup.com/GoLivelabs/members/' + memberid + '/', function (err, res, body) {
        if (err) {
            console.log('Error: ', err);
            callback(err, null);
        }
        else {
            var $ = cheerio.load(body);
            var items = $('.D_memberProfileContentItem');
            index = items.eq(3).children('p').html() ? 3 : 4;
            callback(null, {
                first: items.eq(index++).children('p').html(),
                last: items.eq(index).children('p').html()
            });
        }
    });
}
