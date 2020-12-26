/* eslint-disable no-unused-vars */
const constants = require('../constants');
const Discord = require('discord.js');

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
	description: 'Sends a reminder in the channel what the next movie is.',
	execute(message, client, args) {
		playingNextBotId = constants.otherChannel.otherChannelBotId;
		playingNextChannel = client.channels.cache.find(channel => channel.name === constants.otherChannel.otherChannelName);
		const messageEmbed = new Discord.MessageEmbed().setColor(constants.embedColor.colorHex);

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
				const movieName = `[${response.embeds[0].title}](${response.embeds[0].url})`;

				// Simple reminder if the command is run by someone other than the bot
				if (message) {
					messageEmbed.setDescription(`Hey ${message.author}! The next movie being played is: ***${movieName}***.`);
					channelToSend.send(messageEmbed);
				}
				else {
					const isMovieDay = args.split(' ').splice(-1) === 'Wednesday';
					if (!isMovieDay) {
						// Sends full reminder message and reacts to itself
						messageEmbed.setDescription(`React to this message by tonight if you're watching the movie, ***${movieName}***, ${constants.timeExpressions[args]}!`);
						channelToSend.send(messageEmbed)
							.then(sentMessage => {
								sentMessage.react('👍');
								sentMessage.react('👎');
							})
							.catch(console.error);
					}
					else {
						// Sends simple reminder before movie
						messageEmbed.setDescription(`REMINDER! Today's movie, ***${movieName}***, will be playing **${constants.timeExpressions[args]}!**`);
						channelToSend.send(messageEmbed);
					}
				}
			}).catch(console.error);
	},
};