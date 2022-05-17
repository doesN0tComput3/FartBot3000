const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses music'),
	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		queue.setPaused(true);
		await interaction.reply('⏸ Paused. Use /resume to resume music');
	},
};