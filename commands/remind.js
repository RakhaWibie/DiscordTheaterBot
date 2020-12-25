/* eslint-disable no-unused-vars */
const constants = require('../constants');

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

const checkIfBotExists = async client => {
	const isSuccess = await client.users.fetch(playingNextBotId)
		.then(user => { return true; })
		.catch(error => {
			// User doesn't exist in this server.
			if (error.code === 10013) {
				return false;
			}
			else {
				console.log(error);
			}
		});
	return isSuccess;
};

module.exports = {
	name: 'remind',
	description: 'Reminder to watch the movie every week',
	execute(message, client, args) {
		playingNextBotId = constants.otherChannel.otherChannelBotId;
		playingNextChannel = client.channels.cache.find(channel => channel.name === constants.otherChannel.otherChannelName);

		// Sends the message in #general if the command isn't called by someone
		if (!message) {
			channelToSend = client.channels.cache.find(channel => channel.name === 'general');
		}
		else {
			channelToSend = message.channel;
		}

		// Checks that you have the correct playingNextBotId
		checkIfBotExists(client)
			.then(doesBotExist => {
				if (!doesBotExist) {
					console.log('Invalid ID for the bot of the playing-next channel. Please input the correct id within constants.js.');
					if (message) {
						channelToSend.send('Whoops! The owner of this bot needs to configure the playing-next bot id correctly...');
					}
					return;
				}
			});

		// Gets upcoming movie and sends reminder message to the channel
		getLastMessageFromBot(null)
			.then(response => {
				const isMovieDay = args.split(' ').splice(-1) === 'Wednesday';
				if (!isMovieDay) {
					// Sends reminder message and reacts to itself
					channelToSend.send(`React to this message by tonight if you're watching the movie, ${response.content}, ${constants.timeExpressions[args]}!`)
						.then(sentMessage => {
							sentMessage.react('👍');
							sentMessage.react('👎');
						})
						.catch(console.error);
				}
				else {
					channelToSend.send(`REMINDER! Today's movie, ${response.content}, will be playing ${constants.timeExpressions[args]}!`);
				}
			}).catch(console.error);
	},
};