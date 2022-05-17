const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays currently playing song info'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		const bar = queue.createProgressBar({
			queue: false,
			length: 19,
		});

		const song = queue.current;

		const embed = new MessageEmbed()
			.setThumbnail(song.setThumbnail)
			.setColor('BLUE')
			.setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar);
		await interaction.reply({ embeds: [embed] });
	},
};