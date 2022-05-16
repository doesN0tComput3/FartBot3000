const Discord = require('discord.js');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.author.bot) return;

		// Save message info
		message.client.snipes.set(message.channel.id, {
			content: message.content,
			author: message.author.tag,
			authorAvatar: message.author.avatarURL(),
			timestamp: message.createdAt,
			image: message.attachments.first() ? message.attachments.first().proxyURL : null,
		});
		// Logs into channel
		const embed = new Discord.MessageEmbed()
			.setTitle('Message Deleted')
			.setColor('RED')
			.setThumbnail(message.author.avatarURL())
			.addField('Author', message.author.toString(), true)
			.setFooter({ text: 'FartBot3000', iconURL: message.client.user.avatarURL() })
			.setTimestamp(message.createdAt);

		if (message.content) {
			embed.setDescription(`A message was deleted in ${message.channel}!`);
			embed.addField('Message', message.content, true);
		}
		// Adds image in if one exists
		const image = message.client.snipes.get(message.channel.id).image;
		if (image) {
			embed.setDescription(`A message was deleted in ${message.channel}!`);
			embed.setImage(image);
		}
		const channel = message.client.channels.cache.find(channel => channel.id === '975535416017051678');
		channel.send({ embeds: [embed] });
	},
};