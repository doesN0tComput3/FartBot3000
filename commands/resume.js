const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes music'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		queue.setPaused(false);
		await interaction.reply('▶ Resumed. Use /pause to pause music');
	},
};