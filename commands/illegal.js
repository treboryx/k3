const { registerFont, createCanvas, loadImage } = require('canvas');
const { stripIndents } = require('common-tags');
const path = require('path');
const { shortenText } = require('../util/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });


exports.run = async function (client, msg, { text, verb }) {

	const settings = client.getGuildSettings(msg.guild);

	if(verb !== "is" || verb !== "are") return msg.channel.send(`\`\`\`Usage: ${msg.settings.prefix}illegal <is/are> <what's illegal (single word)>\`\`\``)
	const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'illegal.png'));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.rotate(7 * (Math.PI / 180));
		ctx.font = '45px Noto';
		ctx.fillText(stripIndents`
			${text}
			${verb} NOW
			ILLEGAL.
		`, 750, 290);
return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'illegal.png' }] });

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'illegal',
	category: "Miscellaneous",
  description: 'Trump illegal bill meme',
  usage: 'illegal'
};
