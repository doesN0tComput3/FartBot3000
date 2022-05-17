const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows the song queue')
		.addNumberOption(option =>
			option.setName('page')
				.setDescription('Page # of queue')
				.setMinValue(1)),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing) return interaction.reply({ content: '❌ No songs in queue', ephemeral: true });

		const totalPages = Math.ceil(queue.tracks.length / 10);
		const page = (interaction.options.getNumber('page') || 1) - 1;

		if (page > totalPages) return interaction.reply({ content: `❌ Invalid page. There are only ${totalPages} pages.`, ephemeral: true });

		const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
			return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
		}).join('\n');

		const currentSong = queue.current;

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTimestamp()
			.setDescription('**Now Playing**\n' +
				(currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : 'None') +
				`\n\n**Queue**\n${queueString}`,
			)
			.setFooter({ text: `FartBot3000 • Page ${page + 1} of ${totalPages}`, iconURL: interaction.client.user.avatarURL() });
		await interaction.reply({ embeds: [embed] });
	},
};