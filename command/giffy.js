
const fetch = require("node-fetch");
const cheerio = require("cheerio");
var array = []

async function get_fact()
{
    await fetch(`https://parade.com/1019842/marynliles/weird-facts/`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const rande = Math.floor(Math.random() * 110)
        $(' span > p').each(function(i,element){
            array.push($(element).text())
        })
        var a1 = array.slice(2,81)
        var a2 = array.slice(83,112)
        array = a1.concat(a2)
        var repli = array[rande]
        var id = repli.indexOf('.');
        msg.reply(array[rande].slice(id+1))
    })
}
module.exports =function (msg){

    get_fact(msg)

}

