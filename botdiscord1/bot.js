console.log("hiii bruhhhh!!!");
require('dotenv').config();
const fetch=require('node-fetch');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on('ready',botOn);

function botOn(){
    console.log("im working");
}

const commandHandler=require("./commands");

client.on('message',commandHandler);


