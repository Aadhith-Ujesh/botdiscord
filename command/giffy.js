const replies=[
    'ur a loser',
    'hi vishak',
    'my god is aadhith',
    'naai sekar',
    'panni sekar',
    'im a dankster',
    'long live giffy'
]

module.exports =function (msg,args){
const id=  Math.floor(Math.random() * replies.length);
msg.reply(replies[id]);
};