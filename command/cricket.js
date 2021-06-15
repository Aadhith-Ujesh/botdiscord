const cheerio = require("cheerio")
const fetch = require("node-fetch")
const msg = "islamabad"
const str = msg.charAt(0).toUpperCase() + msg.slice(1)

function get_match_url(){
    fetch('https://www.cricbuzz.com/')
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body)
        $('#hm-scag-mtch-blk > ul > li  a').each(function(i,ele){
            const match = ($(this).attr("title"))
            if(match.indexOf(str) != -1){
                console.log(match)
                const match_url = $(this).attr("href")
                console.log(match_url)
            }
        })
    });
}
get_match_url()