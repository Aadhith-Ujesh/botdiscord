const cheerio = require("cheerio");
const fetch = require("node-fetch");
const url = `https://www.espncricinfo.com`
const link = `/series/dhaka-premier-division-twenty20-2021-1264572/sheikh-jamal-dhanmondi-club-vs-old-dohs-sports-club-56th-match-1266486/live-cricket-score`

function get_evry_ball(){
    fetch(`${url}${link}`)
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

get_evry_ball()