const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'

async function findRating(msg,imdbID,name){
    await fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $image = $('#title-overview-widget > div.vital > div.slate_wrapper > div.poster > a > img')
        const image =$image.attr('src');
        const $synopsis=$('#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary')
        console.log(image);
        console.log($synopsis.text())
        const syn =$synopsis.text()
        card(msg,image,name,syn);
    });
}

function card(msg,image,name,syn){
    const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(name)
        .setImage(image)
        .setDescription(syn)
    msg.channel.send(exampleEmbed);
}
module.exports = function(msg,args){
    fetch(`${searchurl}${args}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $findtitle = $('td.result_text > a');
        const $findname = $('table > tbody > tr:nth-child(1) > td.result_text > a');
        const title= $findtitle.attr('href');
        const name = $findname .text()
        console.log(name,title);
        setTimeout(findRating,2000,msg,title,name);
        
});
}