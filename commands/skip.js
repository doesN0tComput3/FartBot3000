const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		const currentSong = queue.current;

		queue.skip();
		const embed = new MessageEmbed()
			.setDescription(`**[${currentSong.title}](${currentSong.url})** skipped.`)
			.setColor('BLUE')
			.setTimestamp()
			.setThumbnail(currentSong.setThumbnail)
			.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });
		await interaction.reply({ embeds: [embed] });
	},
};