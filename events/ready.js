const statuses = require('../statuses.json');
const FartBot3000 = require('../package.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('HI');

		setInterval(function () {
			const statusType = Math.floor(Math.random() * (6 - 1 + 1) + 1);

			// Playing statuses
			if (statusType >= 1 && statusType <= 2) {
				const status = Math.floor(Math.random() * statuses.playingStatus.length);
				client.user.setActivity(`${statuses.playingStatus[status]} • v${FartBot3000.version}`, { type: 'PLAYING' });
				// Listening statuses
			} else if (statusType >= 3 && statusType <= 4) {
				const status = Math.floor(Math.random() * statuses.listeningStatus.length);
				client.user.setActivity(`${statuses.listeningStatus[status]} • v${FartBot3000.version}`, { type: 'LISTENING' });
				// Watching statuses
			} else if (statusType >= 5 && statusType <= 6) {
				const status = Math.floor(Math.random() * statuses.watchingStatus.length);
				client.user.setActivity(`${statuses.watchingStatus[status]} • v${FartBot3000.version}`, { type: 'WATCHING' });
			}
		}, 10000);
	},
};