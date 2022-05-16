const Discord = require('discord.js');

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;
		if (oldMessage.content.includes('https://') || oldMessage.content.includes('http://') || oldMessage.content.includes('www.')) return;
		if (newMessage.content.includes('https://') || newMessage.content.includes('http://') || newMessage.content.includes('www.')) return;
		if (!oldMessage.guild) return;
		if (!oldMessage.content) return;

		// Save message info
		oldMessage.client.editSnipes.set(oldMessage.channel.id, {
			oldContent: oldMessage.content,
			newContent: newMessage.content,
			author: oldMessage.author.tag,
			authorAvatar: oldMessage.author.avatarURL(),
			timestamp: newMessage.createdAt,
			oldImage: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
			newImage: newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null,
		});

		const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setLabel('Jump to message')
					.setURL(`https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`)
					.setStyle('LINK'),
			);

		const embed = new Discord.MessageEmbed()
			.setTitle('Message Edited')
			.setColor('YELLOW')
			.setDescription(`${oldMessage.author} edited their message in ${oldMessage.channel}.`)
			.setThumbnail(oldMessage.author.avatarURL())
			.addField('Old Message', oldMessage.content, true)
			.addField('New Message', newMessage.content, true)
			.setTimestamp(newMessage.createdAt)
			.setFooter({ text: 'FartBot3000', iconURL: oldMessage.client.user.avatarURL() });

		const image = newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null;

		if (image) {
			embed.setImage(image);
		}

		const channel = oldMessage.client.channels.cache.find(channel => channel.id === '975539313058131981');

		channel.send({ embeds: [embed], components: [row] });
	},
};