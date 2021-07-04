const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'

async function findRating(imdbID,name){
    await fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        // const $image = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(14) > div.ipc-shoveler > div.ipc-sub-grid.ipc-sub-grid--page-span-2.ipc-sub-grid--nowrap.ipc-shoveler__grid > div:nth-child(1) > a')
        // const imag =$image.attr('href');
        // console.log(imag);
        const $synopsis=$('span.GenresAndPlot__TextContainerBreakpointXL-cum89p-5.kyYEQT')
        console.log($synopsis.text())
        $('div.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0.iGxbgr > ul > li').each(function(i,element)
        {
            console.log($(element).text())
        })
        const rating = $('span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text()
        console.log(rating.slice(0,3))
        // const syn =$synopsis.text()
        // card(msg,image,name,syn);
    });
}

// function card(msg,image,name,syn){
//     const exampleEmbed = new Discord.MessageEmbed()
//         .setTitle(name)
//         .setImage(image)
//         .setDescription(syn)
//     msg.channel.send(exampleEmbed);
// }
function imdb(){
    args="thupakki"
    fetch(`${searchurl}${args}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $findtitle = $('td.result_text > a');
        const $findname = $('table > tbody > tr:nth-child(1) > td.result_text > a');
        const title= $findtitle.attr('href');
        const name = $findname .text()
        console.log(name,title);
        setTimeout(findRating,2000,title,name);
});
}
imdb()