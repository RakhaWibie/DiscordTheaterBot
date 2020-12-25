/* eslint-disable no-unused-vars */
const constants = require('../constants');

module.exports = {
	name: 'ping',
	description: 'this is a ping command',
	execute(message, client, args) {
		if (message.member.roles.cache.has(constants.privilegedRole.roleId)) {
			message.channel.send('pong!');
		}
		else {
			message.channel.send('LOL you don\'t have permissions!');
		}
	},
};