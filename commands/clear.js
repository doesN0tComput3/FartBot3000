const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Deletes messages')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('How much to delete')
				.setRequired(true)),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		await interaction.channel.bulkDelete(amount);

		await interaction.reply({ content: `Deleted ${amount} messages 🤫`, ephemeral: true });
	},
};