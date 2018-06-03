const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log('I am ready!');
});

// COMMANDS
client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(process.prefix).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const gameSet = args.join(" ");
  
  // Say Command
  if (command === '$say') {
       const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    }
  




});
client.login(process.env.BOT_TOKEN);
