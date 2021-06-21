const cheerio = require("cheerio");
const fetch = require("node-fetch");
var link = ''
const url = 'https://www.espncricinfo.com'
var prev = 0
var clear =''

async function get_evry_ball(msg){
    
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        var $ = cheerio.load(body)
        var comment = $('.match-comment-run').text().slice(0,1)
        console.log(comment)
        var fifty=""
        $('.match-comment-long-text > p').each(function(i,element){
            fifty= $(element).text();
            return false  
        })
        console.log(fifty)
        var sover =$('.match-comment-over').text().slice(0,4)
        var over = parseFloat(sover)
        if(sover[sover.length-1]==1)
            {
                get_every_over(msg)
            }
        if(over > prev){
            prev = over
            if(comment == 'W')
            {
                const wicket = $('.match-comment-wicket').text()
                console.log(wicket)
                msg.reply(wicket)
            }
            else if(comment=='4' || comment == '6')
            {
                const four =$('.match-comment-short-text').text().split("runs")[0]
                x=four + "runs"
                console.log(x)
                msg.reply(x)
            }
            else if(comment=='•' || comment == '1')
            {
                const dot =$('.match-comment-short-text').text().split("run")[0]
                console.log(dot + "run")
                x=dot+"run"
                msg.reply(x)
            }
            else if(comment=='2' || comment=='3')
            {
                const two =$('.match-comment-short-text').text().split("runs")[0]
                console.log(two + "runs")
                x=two + "runs"
                msg.reply(x)
            }            
            console.log(comment)
            if(fifty.indexOf('fifty')!=-1 || fifty.indexOf('50')!=-1 || fifty.indexOf('FIFTY')!=-1 ||  fifty.indexOf('Fifty')!=-1)
            {
                // console.log(fifty);
                msg.reply(fifty)
            }
            else if(fifty.indexOf('hunderd')!=-1 || fifty.indexOf('100')!=-1 ||fifty.indexOf('Hunderd')!=-1 ||fifty.indexOf('hunderd')!=-1){
                // console.log(fifty)
                msg.reply(fifty)
            }
            else if(fifty.indexOf('two hunderd')!=-1 || fifty.indexOf('200')!=-1 ||fifty.indexOf('TWO HUNDRED')!=-1 ||fifty.indexOf('Two Hunderd')!=-1){
                // console.log(fifty)
                msg.reply(fifty);
            }
        }
    });
}

async function get_every_over(msg)
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


module.exports = async function(msg,args){
    if(args=='stop')
    {   
        bool=0
        msg.reply("Thank for using");
        clearInterval(clear)
        prev=0
        return false
    }

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
                return false
            }
        })
    })
    
    get_evry_ball(msg)
    clear = setInterval(get_evry_ball,15000,msg)
    
};
