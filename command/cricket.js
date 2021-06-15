const cheerio = require("cheerio");
const fetch = require("node-fetch");
const msg = "zimbabwe"
const str = msg.charAt(0).toUpperCase() + msg.slice(1);

function get_match_url(){
    fetch('https://www.espncricinfo.com/live-cricket-score')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body)
        $('a.match-info-link-FIXTURES').each(function(i,element)
        {   
            const match = $(element).attr('href');
            const arr = match.split('/')[3];
            if(arr.indexOf(msg) != -1){
                console.log(arr,match);
                
            }
        })
    }
        )
    
};
get_match_url()