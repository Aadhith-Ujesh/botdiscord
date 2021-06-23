const cheerio = require("cheerio");
const fetch = require("node-fetch");
const Discord = require("discord.js")
var teams = []
var scores = []
var link = ''
const url = 'https://www.espncricinfo.com'
var prev = 0
var clear =''
var cob = 0
var search=[]

async function other_match(msg,args)
{   console.log(typeof(args));
    // search = args.split(" ");
    search = args.join('+')
    console.log(search)
    await fetch(`https://www.google.com/search?q=${search}`)
        .then(res => res.text())
        .then(body => {
            const $ = cheerio.load(body)
            link = $('#rso > div:nth-child(1) > div > div > div > div.yuRUbf > a').attr("href")
            other_match_details(msg)
        })
    }

async function other_match_details(msg)
{
    await fetch(`${link}`)
    .then(response => response.text())
    .then(body => {
        var $ = cheerio.load(body)
        var $ = cheerio.load(body)
        desc = $('.match-info-MATCH .description').text()
        $('.match-info-MATCH .name').each(function(i,element){
            teams.push($(element).text())
        })
        $('.match-info-MATCH .score').each(function(i,element){
            scores.push($(element).text())
            })
        result = $('.match-info-MATCH .status-text').text()
        mom = $('.best-player-name a').text()
        momc = mom + ' - ' + $('.best-player-team-name').text()
    })
    const Embed = new Discord.MessageEmbed()
        .setTitle("Result")
        .addField("Description:",desc)
        .addField(teams[0], scores[0], true)
        .addField(teams[1], scores[1], true)
        .setDescription(result)
        .addField("Man of the Match",momc)
        // .addField(mom,momc,true)
    msg.channel.send(Embed);
}

async function get_score(msg){
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        var $ = cheerio.load(body)
        $('.match-info-MATCH .name').each(function(i,element){
            teams.push($(element).text())
            // console.log(teams)
        })
        $('.match-info-MATCH .score').each(function(i,element){
            scores.push($(element).text())
            
        })
    })
    console.log(teams)
    console.log(scores)
    const embed = new Discord.MessageEmbed()
        .setTitle("Score")
        .addField(teams[0], scores[0], true)
        .addField(teams[1], scores[1], true)
    msg.channel.send(embed);
}

function find_country(args){
    var country = {"wi" : "west-indies" , "sa" : "south-africa" , "ind" : "india" , "eng" : "england" , 
                "nz" : "new-zealand" , "aus" : "australia" , "sl" : "sri-lanka" , "ban" : "bangladesh"}
    if(args in country){
        args = country[args]
    console.log(args)
    
    }
    return args
}

async function get_summary(msg,link)
{
    var result=''
    var mom = ''
    var momc =''
    var desc =''
    var img=''
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        var $ = cheerio.load(body)
        desc = $('.match-info-MATCH .description').text()
        $('.match-info-MATCH .name').each(function(i,element){
            teams.push($(element).text())
        })
        $('.match-info-MATCH .score').each(function(i,element){
            scores.push($(element).text())
            })
        result = $('.match-info-MATCH .status-text').text()
        mom = $('.best-player-name a').text()
        momc = mom + ' - ' + $('.best-player-team-name').text()
        })
    const Embed = new Discord.MessageEmbed()
        .setTitle("Result")
        .addField("Description:",desc)
        .addField(teams[0], scores[0], true)
        .addField(teams[1], scores[1], true)
        .setDescription(result)
        .addField("Man of the Match",momc)
        // .addField(mom,momc,true)
    msg.channel.send(Embed);    
 }
async function get_evry_ball(msg){
    
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        var $ = cheerio.load(body)
        var comment = $('.match-comment-run').text().slice(0,1)
        console.log(comment)
        var fifty = ""
        $('.match-comment-long-text > p').each(function(i,element){
            fifty= $(element).text();
            return false  
        })
        console.log(fifty)
        var sover = $('.match-comment-over').text().slice(0,4)
        var over = parseFloat(sover)
        if(sover[sover.length-1]==1)
            {
                get_every_over()
            }
        if(over > prev){
            prev = over
            if(comment == 'W')
            {
                const wicket = $('.match-comment-wicket').text()
                console.log(wicket)
                comment+="icket"
                card(msg,comment,wicket)
                get_score(msg)
                // msg.reply(wicket)

            }
            else if(comment=='4' || comment == '6')
            {
                cob+=1
                const four =$('.match-comment-short-text').text().split("runs")[0]
                x=four + "runs"
                console.log(x)
                card(msg,comment,x)
                if(cob>4){
                    get_score(msg)
                    cob = 0
                }
                // msg.reply(x)

            }
            else if(comment=='•' || comment == '1')
            {
                const dot =$('.match-comment-short-text').text().split("run")[0]
                console.log(dot + "run")
                x=dot+"run"
                card(msg,comment,x)
                get_score(msg)
                // msg.reply(x)
            }
            else if(comment=='2' || comment=='3')
            {
                const two =$('.match-comment-short-text').text().split("runs")[0]
                console.log(two + "runs")
                x=two + "runs"
                card(msg,comment,x)
                // msg.reply(x)
            }            
            console.log(comment)
            if(fifty.indexOf('fifty')!=-1 || fifty.indexOf('50')!=-1 || fifty.indexOf('FIFTY')!=-1 ||  fifty.indexOf('Fifty')!=-1)
            {
                comment = "Fifty"
                card(msg,comment,fifty)
                get_score(msg)
                // msg.reply(fifty)
            }
            else if(fifty.indexOf('hunderd')!=-1 || fifty.indexOf('100')!=-1 ||fifty.indexOf('Hunderd')!=-1 ||fifty.indexOf('hunderd')!=-1){
                comment = "Hundred"
                card(msg,comment,fifty)
                get_score(msg)
                // msg.reply(fifty)
            }
            else if(fifty.indexOf('two hunderd')!=-1 || fifty.indexOf('200')!=-1 ||fifty.indexOf('TWO HUNDRED')!=-1 ||fifty.indexOf('Two Hunderd')!=-1){
                comment = "Double Hundred"
                card(msg,comment,fifty)
                get_score(msg)
                // msg.reply(fifty);
            }
        }
    });
}

async function get_every_over()
{
    await fetch(`${url}`)
    .then(response => response.text())
    .then(body => {
    var $ = cheerio.load(body)
    var i = 0
    var a=""
    $('.comment-over-end-caps').each(function(i,element){
        if( i >= 2 )
        {return 0}
        a += $(element).text() + " "
        i++
    })
   
    });
}  

function card(msg,comment,comm){
    const Embed = new Discord.MessageEmbed()
        .setTitle(comment)
        .setDescription(comm)
    msg.channel.send(Embed);
}

module.exports = async function(msg,args){
    if(args=='stop')
    {   
        bool=0
        msg.reply("Thank for using");
        clearInterval(clear)
        prev=0
        teams = []
        scores = []
        return false
    }
    args = find_country(args)
    console.log(args)
    await fetch('https://www.espncricinfo.com/live-cricket-score')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body)
        $('a.match-info-link-FIXTURES').each(function(i,element)
        {   
            var match = $(element).attr('href');
            var arr = match.split('/')[3];
            if(arr.indexOf(args) != -1){
                link = match;
                console.log(link)
                if(link.indexOf("full-scorecard")!=-1)
                {
                    get_summary(msg,link)
                }
                return false
            }
        })
        
    get_evry_ball(msg)
    clear = setInterval(get_evry_ball,15000,msg)
    
    if (!(link))
    {  
        other_match(msg,args) 
    }

})
}
    


