// const replies=[
//     'ur a loser',
//     'hi vishak',
//     'my god is aadhith',
//     'naai sekar',
//     'panni sekar',
//     'im a dankster',
//     'long live giffy'
// ]

const fetch = require("node-fetch");
const cheerio = require("cheerio");
var array = []

async function get_fact(msg)
{
    await fetch(`https://parade.com/1019842/marynliles/weird-facts/`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const rande = Math.floor(Math.random() * 110)
        $(' span > p').each(function(i,element){
            array.push($(element).text())
        })
        array = array.slice(12,112)
        var repli = array[rande]
        var id = repli.indexOf('.');
        msg.reply(array[rande].slice(id+1))
    })
}

module.exports =function (msg){

    get_fact(msg)

}

