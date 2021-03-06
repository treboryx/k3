const { registerFont, createCanvas, loadImage } = require('canvas');
const { stripIndents } = require('common-tags');
const request = require('node-superfetch');
const path = require('path');
const { shortenText } = require('../util/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });


exports.run = async function(client, message, args) {

  const settings = client.getGuildSettings(message.guild);

  const target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) return message.reply(`Usage: ${message.settings.prefix}steamplaying [user] [game]`);
  // let user = args[0];
  if (!args[0].startsWith('<@') && (!args[0].endsWith('>'))) return message.reply(`Usage: ${message.settings.prefix}steamplaying [user] [game]`);
  const game = args.join(' ').slice(21);
  if (!game) return message.reply(`Usage: ${message.settings.prefix}steamplaying [user] [game]`);
  const avatarURL = target.user.displayAvatarURL;


  try {
    const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'steam-now-playing.png'));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(avatar, 21, 21, 32, 32);
    ctx.fillStyle = '#90ba3c';
    ctx.font = '10px Noto';
    ctx.fillText(target.user.username, 63, 26);
    ctx.fillText(shortenText(ctx, game, 160), 63, 54);
    return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'steam-now-playing.png' }] });
  } catch (err) {
    return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'steamplaying',
  category: 'Misc',
  description: 'User is now playing, like on steam.',
  usage: 'steamplaying [game] [user]'
};
