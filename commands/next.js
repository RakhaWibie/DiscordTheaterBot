/* eslint-disable no-unused-vars */
const constants = require('../constants');

module.exports = {
	name: 'next',
	description: 'Sends a reminder in the channel what the next movie is.',
	execute(message, client, args) {
		client.commands.get('remind').execute(message, client, args);
	},
};