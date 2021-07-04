const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'
var details = ""

async function findRating(msg,imdbID,name){
    await fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        
        const $synopsis=$('span.GenresAndPlot__TextContainerBreakpointXL-cum89p-5.kyYEQT')
        console.log($synopsis.text())
        const syn =$synopsis.text()

        const rating = $('span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text()
        console.log(rating.slice(0,3))
        rat = rating.slice(0,3)

        $('div.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0.iGxbgr > ul > li').each(function(i,element)
        {
            details += ($(element).text() + '\n' ) 
        })
        console.log(details)

        const $image = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(14) > div.ipc-shoveler > div.ipc-sub-grid.ipc-sub-grid--page-span-2.ipc-sub-grid--nowrap.ipc-shoveler__grid > div:nth-child(1) > div > img')
        const img = $image.attr('src') 
        console.log(img)
        
        card(msg,img,name,syn,rat,details);
    });
}

function card(msg,img,name,syn,rat,details){
    const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(name)
        .setImage(img)
        .setDescription(syn)
        .addField(rat)
        .addField(details)
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