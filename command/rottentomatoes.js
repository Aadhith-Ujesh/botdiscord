const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Discord = require("discord.js")
const searchurl = "https://www.imdb.com/find?s=tt&ref_=fn_tt&q=";
const url = 'https://www.imdb.com/'
const details = [];

async function findRating(imdbID,name){
    await fetch(`${url}${imdbID}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        const $f_type = $("div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(1)");
        const type = $f_type.text();
        const $synopsis=$('span.GenresAndPlot__TextContainerBreakpointXL-cum89p-5.kyYEQT')
        console.log($synopsis.text())
        $('div.PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0.iGxbgr > ul > li').each(function(i,element)
        {
            details.push($(element).text());
            // console.log($(element).text());
            return 0;
        })
        const rating = $('span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text()
        // console.log(rating.slice(0,3))
        // const syn =$synopsis.text()
        // card(msg,image,name,syn);
        console.log(type)
        if(type == "TV Series"){
            details[0] = "Creator" + " : " + details[0].slice(7,)
            const str = details[1].slice(5,)
            var star = "Stars" + " : "
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
            details[0] = "Director" + " : " + details[0].slice(8,)
            details[1] = "Writer" + " : " + details[0].slice(6,)
            const str = details[2].slice(5,)
            var star = "Stars" + " : "
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
    args="breakingbad"
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