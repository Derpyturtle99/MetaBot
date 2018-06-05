const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log('I am ready!');
});

// CONFIG COMMANDS
client.on('message', message => {
    const args = message.content.slice(process.prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.author.id !== "350427539493093377") return;
    
    // Wait function
    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
        end = new Date().getTime();
        }
   };
    
    // Restart Bot
    if (command === '$restart') {
        console.log('Restart Requested')
        client.destroy()
        .then(client.login(process.env.BOT_TOKEN))
        .then(client.on('ready', () => {
            client.user.setPresence({ game: { name: 'Starting Up...', type: 1} });
            wait(2000);
            client.user.setPresence({ game: { name: null, type: 0} });
        }))
    };
    
    // Set Game
    if (command === '$game') {
        const gameSet = args.join(" ");
        if (gameSet === 'reset' || message.content === '$game') {
            message.reply('Game has been reset.')
            client.user.setPresence({ game: { name: null, type: 0} });
        } else {
            client.user.setPresence({ game: { name: gameSet, type: 0} });
            message.reply('Game set to: ``' + (gameSet) + '``');
        }
    };
    
    // Set Status
    if  (command === '$status') {
        const statusSet = args.join(" ");
        if (statusSet === 'reset' || statusSet === 'online' || message.content === '$status') {
            message.reply('Status set to: ``' + 'online' + '``')
            return client.user.setPresence({ status: 'online' });
        }
        if (statusSet === 'idle') {
            message.reply('Status set to: ``' + (statusSet) + '``');
            return client.user.setPresence({ status: 'idle' });
        }
        if (statusSet === 'dnd') {
            message.reply('Status set to: ``' + (statusSet) + '``');
            return client.user.setPresence({ status: 'dnd' });
        }
        if (statusSet === 'offline' || statusSet === 'invisible') {
            message.reply('Status set to: ``' + (statusSet) + '``');
            return client.user.setPresence({ status: 'invisible' });
        } else {
            message.reply('Please specify a status.')
        }
    };
    
      // Say Command
  if (command === '$say') {
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    }
    
});
// COMMANDS
client.on('message', message => {
  if(message.author.bot) return;
  const args = message.content.slice(process.prefix).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
    // Ping Command
    if(command === "$ping") {
    console.log('pinging...')
        startTime = Date.now();
        message.channel.send("Pinging...").then((message) => {
            endTime = Date.now();
            let ping = Math.round(endTime - startTime)
            let rounded = ping / 1000
            message.edit(`${ping}ms | ${rounded} seconds.`)
            console.log(`Ping outcome is ${ping}ms | ${rounded} seconds.`)
        });
    };
    
    // Dice Command
    if (command === '$dice') {
        function doDice() {
        var diceAnswer = ['1', '2', '3', '4', '5', '6'];
        return diceAnswer[Math.floor(Math.random()*diceAnswer.length)];
        }
        message.reply(doDice() + '.');
    }
    
    // Coinflip Command
      if (command === '$cf' || command === '$coinflip') {
          function doCoinFlip() {
          var coinAnswer = ['Heads', 'Tails'];
          return coinAnswer[Math.floor(Math.random()*coinAnswer.length)];
          }
          message.reply(doCoinFlip() + '.');
      }
    
    // 8 Ball Command
    if (command === '$8ball') {
        function doBall() {
            var ballAnswer = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
            return ballAnswer[Math.floor(Math.random()*ballAnswer.length)];
        }
        if (message.content === '$8ball') {
            return message.reply('Please specify your question.');
        }
        message.reply(doBall() + '.');
    };
  
    // Avatar Command
    if (command === '$avatar') {
        let user = message.mentions.users.first();
        const unmentionedEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}#${message.author.discriminator}'s avatar`)
        .setImage(message.author.avatarURL)
        .setColor(0x9999FF)
        if (message.mentions.users.size < 1) return message.channel.sendEmbed(unmentionedEmbed)
        const mentionedEmbed = new Discord.RichEmbed()
        .setTitle(`${user.username}#${user.discriminator}'s avatar`)
        .setImage(user.avatarURL)
        .setColor(0x9999FF)
        .setFooter("Requested by: " + `${message.author.username}#${message.author.discriminator}`)
        message.channel.sendEmbed(mentionedEmbed);
    }
    
    // User Info Command
  if (command === '$info') {
      const memberGame = message.author.presence.game;
      const unmentionedEmbed = new Discord.RichEmbed()
      .setTitle(`${message.author.username}#${message.author.discriminator}`)
      .addField("Status:", message.author.presence.status)
      .addField("Bot:", message.author.bot)
      .addField("Playing:", memberGame !== null ? memberGame.name : "none", true)
      .addField("Guild Join Date:", message.guild.joinedAt.toDateString())
      .addField("Account Creation Date:", message.author.createdAt)
      .setColor(0x9999FF)
      .setFooter('Join dates may not be accurate if the member has rejoined')
      if (message.mentions.users.size < 1) return message.channel.sendEmbed(unmentionedEmbed)
      // if member has been mentioned
      let user = message.mentions.users.first();
      const userGame = user.presence.game;
      const mentionedEmbed = new Discord.RichEmbed()
      .setTitle(`${user.username}#${user.discriminator}`)
      .addField("Status:", user.presence.status)
      .addField("Bot:", user.bot)
      .addField("Playing:", userGame !== null ? userGame.name : "none", true)
      .addField("Guild Join Date:", message.guild.joinedAt.toDateString())
      .addField("Account Creation Date:", user.createdAt)
      .setColor(0x9999FF)
      .setFooter('Join dates may not be accurate if the member has rejoined')
      message.channel.sendEmbed(mentionedEmbed);
  }
    
});
client.login(process.env.BOT_TOKEN);
