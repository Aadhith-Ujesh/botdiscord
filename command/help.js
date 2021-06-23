const Discord = require("discord.js")


module.exports = (msg,args) =>{
    const Embed = new Discord.MessageEmbed()
        .setTitle('GIFFY BOT')
        .setDescription('A bot to send gifs, get details of movies and get live updates of cricket matches!')
        .addField('-gif keyword','posts a gif for the appropriate keyword')
        .addField('-cric countryname','updates all the important events of the mathch')
        .addField('-mov moviename','gets the synopsis, poster and cast of the movie from imDB')
        .addField('-giffy','bazzles your mind with a mind-blowing fact!')
    msg.channel.send(Embed);
}