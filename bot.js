const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log('I am ready!');
});

// CONFIG COMMANDS
client.on('message', message => {
    const args = message.content.slice(process.prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const gameSet = args.join(" ");
    if(message.author.id !== "350427539493093377") return;
    
    if (command === '$setgame') {
        if (gameSet === 'reset' || message.content === '$setgame') {
            message.reply('Game has been reset!')
            client.user.setPresence({ game: { name: null, type: 0} });
        } else {
            client.user.setPresence({ game: { name: gameSet, type: 0} });
            message.reply('Game set to: ``' + (gameSet) + '``');
        }
    }
        

});
// COMMANDS
client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(process.prefix).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Say Command
  if (command === '$say') {
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    }
  
    // User Info Command
  if (command === '$info') {
      const embed = new Discord.RichEmbed()
      .setTitle(`${message.author.avatar}${message.author.username}#${message.author.discriminator}`)
      .addField("Status:", `${message.clientUserSettings.status}`)
      .addField("Current Game", `${message.author.showCurrentGame}`)
      .addField("Bot:", `${message.author.bot}`)
      .addField("Guild Join Date:", "test")
      .addField("Account Creation Date:", message.author.createdAt)
      .setColor(0x9999FF)
      .setFooter('Join dates may not be accurate if the member has rejoined')
      message.channel.sendEmbed(embed);
  }

});
client.login(process.env.BOT_TOKEN);
