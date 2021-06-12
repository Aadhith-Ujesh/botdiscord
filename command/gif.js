const fetch= require('node-fetch');
module.exports= async function(msg,args){
let keywords="john cena";
        if(args.length >0){
             keywords=args.join(" ");
        }
        let url=`https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contenfilter=high`
        let response= await fetch(url);
        let json = await response.json();
        msg.reply(json.results[0].url);
    }