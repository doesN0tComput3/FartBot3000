const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic 8-ball')
		.addStringOption(option =>
			option.setName('question')
				.setDescription('what do u wanna ask it')
				.setRequired(true)),
	async execute(interaction) {
		const result = Math.floor((Math.random() * config.responses.length));

		const question = interaction.options.getString('question');

		const embed = new Discord.MessageEmbed()
			.setTitle('8-Ball')
			.addField('Question', question)
			.addField('Answer', config.responses[result])
			.setThumbnail(interaction.user.avatarURL())
			.setTimestamp(interaction.createdAt)
			.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });
		if (result === 0 || result === 1 || result === 2 || result === 3 || result === 4 || result === 5 || result === 6 || result === 7 || result === 8 || result === 9) {
			embed.setColor('GREEN');
		} else if (result === 10 || result === 11 || result === 12 || result === 13 || result === 14) {
			embed.setColor('YELLOW');
		} else {
			embed.setColor('RED');
		}

		await interaction.reply({ embeds: [embed] });
	},
};