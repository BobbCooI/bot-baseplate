const Discord = require('discord.js');

module.exports = (Swolly) => ({
     async log (message, name = 'log') {
  const date = Date().toString().split(' ').slice(1, 5).join(' ');
  message = message instanceof Object ? require('util').inspect(message) : message;
//console.log('logger', this)
  let chan =  await Swolly.client.channels.get('793650413865009152');
  let embed = new Discord.RichEmbed()
 .setTitle(name)
  .addField(`[${date}]`, message, false)
 .setTimestamp()
 .setColor('ORANGE');
await chan.send(embed).catch(e => console.log(message));
}
})
