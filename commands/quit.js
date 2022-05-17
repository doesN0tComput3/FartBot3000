const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quit')
		.setDescription('Stop playing, clears queue'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		queue.destroy();
		await interaction.reply('ok bye');
	},
};