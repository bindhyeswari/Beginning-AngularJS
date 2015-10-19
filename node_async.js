

var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var memberids = ['188506734', '172023162', '191514653'];

/*getMemberName_P('172023162').then(function (name) {
 console.log(name);
 });*/

var fns = memberids.map(function (memberid) {
    return getName.bind(null, memberid); // fn - memberid is bound, it will take 1 input = callback
});

async.parallelLimit(fns, 4, function (err, results) {
    console.log(results);
});



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
