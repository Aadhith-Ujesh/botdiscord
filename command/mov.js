const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");


const getMovieRating = async (msg,args) => {
    let movie = args.join('+');
    await axios.get(`https://www.google.com/search?q=${movie}`)
    .then(res => {
        const $ = cheerio.load(res.data);
        const rating = $(".gsrt IZACzd").text();
        console.log(rating)
        msg.reply(rating);
    })
}

module.exports=getMovieRating;