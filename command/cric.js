// Requirements..
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const Discord = require("discord.js")

class cricket{
    constructor(msg,link,url,prev,clear,cob,args){
        this.url = url
        this.link = link
        this.prev = prev
        this.clear = clear
        this.cob = cob
        this.msg = msg
        this.args = args
    }

    async get_link(){

        if(this.args=='stop')
        {   
            bool=0
            this.msg.reply("Thank for using");
            clearInterval(this.clear)
            this.prev=0
            return false
        }

        fetch('https://www.espncricinfo.com/live-cricket-score')
        .then(res => res.text())
        .then(body => {
            const $ = cheerio.load(body)
            this.find_country();
            let country = this.args;
            $('a .match-info-link-FIXTURES').each((i,element) => {   
                var match = $(element).attr('href');
                var arr = match.split('/')[3];
                if(arr.indexOf(country) != -1){
                    this.link = match
                    console.log("hi")
                    console.log(this.link)
                    this.link = this.link.replace("full-scorecard" , "live-cricket-score")
                    return false
                }
                console.log("hello")
            })
        })
        
        await this.get_evry_ball()
        this.clear = setInterval(this.get_evry_ball,15000,this.msg)
        
    }

    find_country(){
        var country = {"wi" : "west-indies" , "sa" : "south-africa" , "ind" : "india" , "eng" : "england" , 
                    "nz" : "new-zealand" , "aus" : "australia" , "sl" : "sri-lanka" , "ban" : "bangladesh"}
        if(this.args in country){
            this.args = country[this.args]
        }
    }

    async get_evry_ball(){
    
        await fetch(`${this.url}${this.link}`)
        .then(response => response.text())
        .then(body => {
            var $ = cheerio.load(body)
            let comment = $('.match-comment-run').text().slice(0,1)
            console.log(comment + "hello")
            var fifty = ""
            $('.match-comment-long-text > p').each(function(i,element){
                fifty= $(element).text();
                return false  
            })
            console.log(fifty)
            var sover = $('.match-comment-over').text().slice(0,4)
            var over = parseFloat(sover)
            if(sover[sover.length-1]==1)
                {
                    this.get_every_over()
                }
            if(over > this.prev){
                this.prev = over
                if(comment == 'W')
                {
                    const wicket = $('.match-comment-wicket').text()
                    console.log(wicket)
                    comment+="icket"
                    card(comment,wicket)
                    this.get_score()
                    // msg.reply(wicket)
    
                }
                else if(comment=='4' || comment == '6')
                {
                    this.cob+=1
                    const four =$('.match-comment-short-text').text().split("runs")[0]
                    x=four + "runs"
                    console.log(x)
                    card(comment,x)
                    if(this.cob>4){
                        this.get_score()
                        this.cob = 0
                    }
                    // msg.reply(x)
    
                }
                else if(comment=='•' || comment == '1')
                {
                    const dot =$('.match-comment-short-text').text().split("run")[0]
                    console.log(dot + "run")
                    x=dot+"run"
                    this.card(comment,x)
                    this.get_score()
                    // msg.reply(x)
                }
                else if(comment=='2' || comment=='3')
                {
                    const two =$('.match-comment-short-text').text().split("runs")[0]
                    console.log(two + "runs")
                    x=two + "runs"
                    this.card(comment,x)
                    // msg.reply(x)
                }            
                console.log(comment)
                if(fifty.indexOf('fifty')!=-1 || fifty.indexOf('50')!=-1 || fifty.indexOf('FIFTY')!=-1 ||  fifty.indexOf('Fifty')!=-1)
                {
                    comment = "Fifty"
                    this.card(comment,fifty)
                    // msg.reply(fifty)
                }
                else if(fifty.indexOf('hunderd')!=-1 || fifty.indexOf('100')!=-1 ||fifty.indexOf('Hunderd')!=-1 ||fifty.indexOf('hunderd')!=-1){
                    comment = "Hundred"
                    this.card(comment,fifty)
                    // msg.reply(fifty)
                }
                else if(fifty.indexOf('two hunderd')!=-1 || fifty.indexOf('200')!=-1 ||fifty.indexOf('TWO HUNDRED')!=-1 ||fifty.indexOf('Two Hunderd')!=-1){
                    comment = "Double Hundred"
                    this.card(comment,fifty)
                    // msg.reply(fifty);
                }
            }
        });
    }

    async get_every_over(){
        await fetch(`${this.url}`)
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

    async get_score(){
        var teams = []
        var scores = []
        var ov = 0
        await fetch(`${this.url}${this.link}`)
        .then(response => response.text())
        .then(body => {
            var $ = cheerio.load(body)
            ov = $('.match-info-MATCH .score-info').text()
            $('.match-info-MATCH .name').each(function(i,element){
                teams.push($(element).text())
                // console.log(teams)
            })
            $('.match-info-MATCH .score').each(function(i,element){
                scores.push($(element).text())
                
            })
        })
        console.log(teams)
        console.log(scores)
        const embed = new Discord.MessageEmbed()
            .setTitle("Score")
            .addField(teams[0], scores[0], true)
            .addField(teams[1], scores[1], true)
            .addField("Overs", ov)
        this.msg.channel.send(embed);
    }

    async get_every_over(){
        await fetch(`${this.url}`)
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

    card(comment,comm){
        const Embed = new Discord.MessageEmbed()
            .setTitle(comment)
            .setDescription(comm)
        this.msg.channel.send(Embed);
    }
}
const url = 'https://www.espncricinfo.com'
module.exports = async function(msg,args){
    var obj = new cricket(msg,"",url,0,"",0,args);
    await obj.get_link();
}