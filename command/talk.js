
const discord = require('discord.js');
const discordTTS = require('discord-tts');
const client = new discord.Client();
client.login("ODU1ODc4NjQ3Mzg2ODY1Njg0.YM45Gg.VkY4Ket3NsKgddW3zs_5YKPu-D4");

client.on('ready', () => {
    console.log('Online');
});

client.on('message', msg => {
    if(msg.content === 'say test 123'){
        const broadcast = client.voice.createBroadcast();
        const channelId = msg.member.voice.channelID;
        const channel = client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream('test 123'));
            const dispatcher = connection.play(broadcast);
        });
    }
});