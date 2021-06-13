const fetch = require("node-fetch");
const cheerio = require("cheerio");
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'

function findRating(msg,imdbID){
    fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const rating=$('span.AggregateRatingButton__RatingScore-sc-1il8omz-1.fhMjqK')
        console.log(rating.text())
        msg.reply(rating.text())
    });
}

module.exports = function(msg,args){
    fetch(`${searchurl}${args}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $element = $('td.result_text > a');
        const val = ($element.attr('href'));
        console.log(val);
        findRating(msg,val);
});
}
