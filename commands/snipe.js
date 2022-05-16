const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Sends the last deleted/edited message in the channel')
		.addSubcommand(subcommand =>
			subcommand.setName('delete')
				.setDescription('Sends the last deleted message'))
		.addSubcommand(subcommand =>
			subcommand.setName('edit')
				.setDescription('Sends the last edited message')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'delete') {
			const msg = interaction.client.snipes.get(interaction.channelId);
			if (!msg) {
				return interaction.reply('❌ there wasn\'t any messages to snipe sorry broski');
			}

			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor({ text: msg.author, iconURL: msg.authorAvatar })
				.setDescription(msg.content)
				.setTimestamp(msg.timestamp)
				.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });

			if (msg.image) {
				embed.setImage(msg.image);
			}

			await interaction.reply({ embeds: [embed] });
		} else {
			const msg = interaction.client.editSnipes.get(interaction.channelId);
			if (!msg) {
				return interaction.reply('❌ there wasn\'t any messages to snipe sorry broski');
			}

			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor({ text: msg.author, iconURL: msg.authorAvatar })
				.addField('Old Message', msg.oldContent, true)
				.addField('New Message', msg.newContent, true)
				.setTimestamp(msg.timestamp)
				.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });

			if (msg.newImage) {
				embed.setImage(msg.newImage);
			}

			await interaction.reply({ embeds: [embed] });
		}
	},
};