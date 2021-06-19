const cheerio = require("cheerio");
const fetch = require("node-fetch");
var link = ''
const url = 'https://www.espncricinfo.com/series/icc-world-test-championship-2019-2021-1195334/india-vs-new-zealand-final-1249875/live-cricket-score'
var a = ""
async function get_every_over()
{
    await fetch(`${url}`)
    .then(response => response.text())
    .then(body => {
    const $ = cheerio.load(body)
    var i = 0
    $('.comment-over-end-caps').each(function(i,element){
        if( i >= 2 )
        {return 0}
        a += $(element).text() + " "
        i++
    })
    console.log(a)
    });
}
get_every_over()