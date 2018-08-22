const Discord = require("discord.js");
const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

exports.run = async function(client, message, args) {

    if(!message.guild.members.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name} - Server Information`, message.guild.iconURL)
      .setColor(0x00AE86)
      // Displays the guild icon on the right side, commented it out cause I don't like it.
      //.setThumbnail(message.guild.iconURL)
      .addField('❯ Name', message.guild.name, true)
      .addField('❯ ID', message.guild.id, true)
      .addField('❯ Region', message.guild.region.toUpperCase(), true)
      .addField('❯ Creation Date', message.guild.createdAt.toDateString(), true)
      .addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
      .addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
      .addField('❯ Owner', message.guild.owner.user.tag, true)
      .addField('❯ Members', message.guild.memberCount, true)
      .addField('❯ Roles', message.guild.roles.size, true)
      .addField('❯ Channels', message.guild.channels.size, true)
      .setFooter(`Generated by ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .setTimestamp()
      message.channel.send({embed});



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['serverinfo'],
  permLevel: "User"
};

exports.help = {
  name: 'server',
  category: "Miscellaneous",
  description: 'Shows information about the server',
  usage: 'server'
};
