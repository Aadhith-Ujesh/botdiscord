const cheerio = require("cheerio");
const fetch = require("node-fetch");
const msg = "sheikh"
var link = ''
const url = 'https://www.espncricinfo.com'

async function get_match_url(){
    await fetch('https://www.espncricinfo.com/live-cricket-score')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body)
        $('a.match-info-link-FIXTURES').each(function(i,element)
        {   
            const match = $(element).attr('href');
            const arr = match.split('/')[3];
            
            if(arr.indexOf(msg) != -1){
                link = match;
            }
        })
    }
        )
    get_evry_ball()
    setInterval(get_evry_ball,30000)
};


async function get_evry_ball(){
    await fetch(`${url}${link}`)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body)
        const comment = $('.match-comment-run').text().slice(0,1)
        console.log(comment)
        if(comment == 'W')
        {
            const wicket = $('.match-comment-wicket').text()
            console.log(wicket)
        }
        else if(comment=='4' || comment == '6')
        {
            const four =$('.match-comment-short-text').text().split("runs")[0]
            console.log(four + "runs")
        }
    });
}
//hi bomma
get_match_url()