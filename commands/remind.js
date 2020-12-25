const other = require('../constants');

let channelToSend;
let playingNextBotId;
let playingNextChannel;

const getLastMessageFromBot = async lastMessageFromOtherBot => {
	let messageToSearchFrom = null;
	let isFound = false;

	while (!isFound) {
		lastMessageFromOtherBot = await playingNextChannel.messages.fetch({ limit: 1, before: messageToSearchFrom });
		if (lastMessageFromOtherBot.first().author.id === playingNextBotId) {
			isFound = true;
		}
		else {
			messageToSearchFrom = lastMessageFromOtherBot.first().id;
		}
	}

	return lastMessageFromOtherBot.first();
};

module.exports = {
	name: 'remind',
	description: 'Reminder to watch the movie every week',
	execute(message, client, args) {
		playingNextBotId = other.otherChannel.otherChannelBotId;
		playingNextChannel = client.channels.cache.find(channel => channel.name === other.otherChannel.otherChannelName);

		// Sends the message in #general if the command isn't called by someone
		if (!message) {
			channelToSend = client.channels.cache.find(channel => channel.name === 'general');
		}
		else {
			channelToSend = message.channel;
		}

		// Checks that you have the correct playingNextBotId
		if (!client.users.cache.has(playingNextBotId)) {
			console.log('Invalid ID for the bot of the playing-next channel');
			return;
		}

		// Gets upcoming movie and sends reminder message to the channel
		getLastMessageFromBot(null)
			.then(response => {
				// Sends reminder message and reacts to itself
				channelToSend.send(`React to this message by tonight if you're watching the movie, ${response.content}, tomorrow at 8pm!`)
					.then(sentMessage => {
						sentMessage.react('👍');
						sentMessage.react('👎');
					})
					.catch(console.error);
			}).catch(console.error);
	},
};