const fetch=require('node-fetch');

const giffy=require("./command/giffy.js")
const gif=require("./command/gif.js")
const mov=require("./command/mov.js")

const commands={
    giffy, gif, mov
};

module.exports =async function (msg){
    
    let tokens=msg.content.split(' ');
    let command=tokens.shift()
    if(command.charAt(0)=='-'){  
        command=command.substring(1);
        commands[command](msg,tokens);
    }
    
}