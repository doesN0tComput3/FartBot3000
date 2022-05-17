const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skipto')
		.setDescription('Skips to a certain track #')
		.addNumberOption(option =>
			option.setName('tracknumber')
				.setDescription('Track to skip to')
				.setMinValue(1)
				.setRequired(true)),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);

		if (!queue) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		const trackNumber = interaction.options.getNumber('tracknumber');
		if (trackNumber > queue.tracks.length) return interaction.reply({ content: '❌ Invalid track number', ephemeral: true });
		queue.skipTo(trackNumber - 1);

		await interaction.reply(`⏩ Skipped to **Track ${trackNumber}**`);
	},
};