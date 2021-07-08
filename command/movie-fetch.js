const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'
var details = []
var type = ""

async function findRating(msg,imdbID,name){
    await fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        
        const $f_type = $("div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(1)");
        type = $f_type.text();

        const $synopsis=$(' div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > p > span.GenresAndPlot__TextContainerBreakpointL-cum89p-1.gwuUFD')
        console.log($synopsis.text())
        const syn = $synopsis.text()
        console.log(syn)

        const rating = $('span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text()
        console.log(rating.slice(0,3))
        rat = rating.slice(0,3)
        $('div.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0.iGxbgr > ul > li').each(function(i,element)
        {
            details.push($(element).text()) 
        })
        console.log(details)
        var star = ""

        if(type == "TV Series"){
            details[0] =details[0].slice(7,)
            const str = details[1].slice(5,)
            low = "qwertyuiopasdfghjklzxcvbnm"
            up = "QWERTYUIOPASDFGHJKLZXCVBNM"
            for (let i = 0 ; i < str.length ; i++){
                star+=str[i]
                if(low.indexOf(str[i]) != -1 && up.indexOf(str[i+1]) != -1 && str[i]!=" "){
                    star+=" , "
                }
            }
            console.log(details[0])
            console.log(star)
        }else{
            details[0] = details[0].slice(8,)
            details[1] = details[1].slice(6,)
            const str = details[2].slice(5,)
            low = "qwertyuiopasdfghjklzxcvbnm"
            up = "QWERTYUIOPASDFGHJKLZXCVBNM"
            for (let i = 0 ; i < str.length ; i++){
                star+=str[i]
                if(low.indexOf(str[i]) != -1 && up.indexOf(str[i+1]) != -1 && str[i]!=" "){
                    star+=" , "
                }
            }
            console.log(details[0])
            console.log(details[1])
            console.log(star)
            
        }
        card(msg,name,syn,rat,details,star);
    });
}

function card(msg,name,syn,rat,details,star){
    if(type == "TV Series"){
        const series= new Discord.MessageEmbed()
            .setTitle(name)
            .setDescription(syn)
            .addField("Rating",rat)
            .addField("Creator",details[0])
            .addField("Stars",star)
        msg.channel.send(series);
    }else{
        const movie= new Discord.MessageEmbed()
            .setTitle(name)
            .setDescription(syn)
            .addField("Rating",rat)
            .addField("Director" , details[0])
            .addField("Writer",details[1])
            .addField("Stars",star)
        msg.channel.send(movie);
    }
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



// const $image = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(14) > div.ipc-shoveler > div.ipc-sub-grid.ipc-sub-grid--page-span-2.ipc-sub-grid--nowrap.ipc-shoveler__grid > div:nth-child(1) > div > img')
//         const img = $image.attr('src') 
//         console.log(img)