/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
	description: 'this is a ping command',
	execute(message, client, args) {
		if (message.member.roles.cache.has('791792436145684500')) {
			message.channel.send('pong!');
		}
		else {
			message.channel.send('LOL you don\'t have permissions!');
		}
	},
};