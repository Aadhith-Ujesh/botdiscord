const cheerio = require("cheerio");
const fetch = require("node-fetch");
var link = ''
const url = 'https://www.espncricinfo.com'
var prev = 0

async function get_evry_ball(msg){
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body)
        const comment = $('.match-comment-run').text().slice(0,1)
        const fifty = $('.match-comment-long-text').text();
        const sover =$('.match-comment-over').text().slice(0,4)
        const over = parseFloat(sover)
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
                console.log(four + "runs")
                msg.reply(four)
            }
            else if(comment=='•' || comment == '1')
            {
                const dot =$('.match-comment-short-text').text().split("run")[0]
                console.log(dot + "run")
                msg.reply(dot)
            }
            else if(comment=='2')
            {
                const two =$('.match-comment-short-text').text().split("runs")[0]
                console.log(two + "runs")
                msg.reply(two)
            }            
            console.log(comment)
            if(fifty.indexOf('fifty')!=-1 || fifty.indexOf('50')!=-1 || fifty.indexOf('FIFTY')!=-1 ||  fifty.indexOf('Fifty')!=-1)
            {
                console.log(fifty);
                msg.reply(fifty)
            }
            else if(fifty.indexOf('hunderd')!=-1 || fifty.indexOf('100')!=-1 ||fifty.indexOf('Hunderd')!=-1 ||fifty.indexOf('hunderd')!=-1){
                console.log(fifty)
                msg.reply(fifty)
            }
            else if(fifty.indexOf('two hunderd')!=-1 || fifty.indexOf('200')!=-1 ||fifty.indexOf('TWO HUNDRED')!=-1 ||fifty.indexOf('Two Hunderd')!=-1){
                console.log(fifty)
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
    const $ = cheerio.load(body)
    var i = 0
    $('.comment-over-end-caps').each(function(i,element){
        if( i >= 2 )
        {return 0}
        a += $(element).text() + " "
        i++
    })
    console.log(a)
    msg.reply(a)
    });
}


module.exports = async function(msg,args){
    await fetch('https://www.espncricinfo.com/live-cricket-score')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body)
        $('a.match-info-link-FIXTURES').each(function(i,element)
        {   
            const match = $(element).attr('href');
            const arr = match.split('/')[3];
            if(arr.indexOf(args) != -1){
                link = match;
                console.log(link)
                return false
            }
        })
    })
    get_evry_ball(msg)
    setInterval(get_evry_ball,15000,msg)
};


