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
        const over = parseFloat($('.match-comment-over').text().slice(0,4))
        // console.log(over)
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
                msg.reply(wicket)
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
        }
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