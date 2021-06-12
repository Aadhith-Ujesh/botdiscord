const request=require('request');
const cheerio =require('cheerio');
module.exports = async function(msgs,args){request('https://www.imdb.com/find?q=the+100&ref_=nv_sr_sm',(error,response,html) => {
    if(!error && response.statusCode==200){
        const $ = await cheerio.load(html);
        link=$('.result_text a').attr('href');
        console.log(link);
        console.log(typeof(link));
        setTimeout(func,2000);
    }
});
}

function func(){
request('https://www.imdb.com/title/tt2661044/?ref_=fn_al_tt_1',(error,response,html)=>{
            if(!error && response.statusCode==200){
                const $ = cheerio.load(html);
                const rating=$('.ratingValue strong')
                console.log(rating.text());
            }
        });
    }