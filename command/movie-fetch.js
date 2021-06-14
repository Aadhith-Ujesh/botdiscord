const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'

function findRating(imdbID){
    fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $synopsis=$('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__RatingContainer-sc-1nlhx7j-2.hBRWEt > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1il8omz-0.cMcGnJ > div.AggregateRatingButton__Rating-sc-1il8omz-2.ckpPOV > span.AggregateRatingButton__RatingScore-sc-1il8omz-1.fhMjqK')
        console.log($synopsis.text())
        return $synopsis.text()
    });
}

async function card(msg,rate,image,name){
    const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(name)
        .setImage(image)
        .setDescription("Rating : " + rate)
    msg.channel.send(exampleEmbed);
}
module.exports = function(msg,args){
    fetch(`${searchurl}${args}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $findtitle = $('td.result_text > a');
        const $findimage = $('table > tbody > tr:nth-child(1) > td.primary_photo > a > img');
        const $findname = $('table > tbody > tr:nth-child(1) > td.result_text > a');
        const title= $findtitle.attr('href');
        const image= $findimage.attr('src')
        const name = $findname .text()
        const rate = findRating(title)
        console.log(rate,name,image);
        card(msg,rate,image,name);
});
}