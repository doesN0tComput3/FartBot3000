const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('love')
		.setDescription('How much does someone love you?')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Who.')
				.setRequired(true)),
	async execute(interaction) {
		const person = interaction.options.getString('name');

		const love = Math.random() * 100;
		const loveIndex = Math.floor(love / 10);
		const loveLevel = '❤'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`How much does ${person} love ${interaction.user.username}?`)
			.setDescription(`**${person}** loves ${interaction.user} this much:\n\n**${Math.floor(love)}%\n${loveLevel}**`)
			.setThumbnail(interaction.user.avatarURL())
			.setTimestamp(interaction.createdAt)
			.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });

		if (Math.floor(love) <= 33) {
			embed.setColor('RED');
		} else if (Math.floor(love) >= 34 && Math.floor(love) <= 67) {
			embed.setColor('YELLOW');
		} else {
			embed.setColor('GREEN');
		}

		await interaction.reply({ embeds: [embed] });
	},
};