const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song')
		.addSubcommand(subcommand =>
			subcommand.setName('song')
				.setDescription('Search YouTube')
				.addStringOption((option) => option.setName('url').setDescription('Song URL').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('playlist')
				.setDescription('Play a full playlist')
				.addStringOption((option) => option.setName('url').setDescription('Playlist URL').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('search')
				.setDescription('Search for a song')
				.addStringOption((option) => option.setName('song').setDescription('Song to search for').setRequired(true))),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return interaction.reply({ content: 'ur not in vc.', ephemeral: true });

		const queue = await interaction.client.player.createQueue(interaction.guild);
		if (!queue.connection) await queue.connect(interaction.member.voice.channel);

		const embed = new MessageEmbed();

		if (interaction.options.getSubcommand() === 'song') {
			const url = interaction.options.getString('url');
			const result = await interaction.client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			});
			if (result.tracks.length === 0) return interaction.editReply('❌ No results...');

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`✅ Added **[${song.title}](${song.url})** - \`${song.duration}\``)
				.setThumbnail(song.thumbnail)
				.setTimestamp()
				.setColor('BLUE')
				.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });
		} else if (interaction.options.getSubcommand() === 'playlist') {
			const url = interaction.options.getString('url');
			const result = await interaction.client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			});
			if (result.tracks.length === 0) return interaction.editReply('❌ No results...');

			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed
				.setDescription(`✅ **${result.tracks.length} songs from [${playlist.title}](${playlist.url})** was added to the queue.`)
				.setThumbnail(playlist.thumbnail)
				.setTimestamp()
				.setColor('BLUE')
				.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });
		} else if (interaction.options.getSubcommand() === 'search') {
			const url = interaction.options.getString('song');
			const result = await interaction.client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			});
			if (result.tracks.length === 0) return interaction.editReply('❌ No results...');

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`✅ Added **[${song.title}](${song.url})** - \`${song.duration}\``)
				.setThumbnail(song.thumbnail)
				.setTimestamp()
				.setColor('BLUE')
				.setFooter({ text: 'FartBot3000', iconURL: interaction.client.user.avatarURL() });
		}

		if (!queue.playing) await queue.play();
		await interaction.reply({ embeds: [embed] });
	},
};