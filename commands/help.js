/* eslint-disable no-unused-vars */
const constants = require('../constants');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists the available commands for this bot.',
	execute(message, client, args) {
		const messageEmbed = new Discord.MessageEmbed()
			.setColor(constants.embedColor.colorHex)
			.setTitle('Discord Theater Bot Commands')
			.setDescription(`Hey, ${message.author}! Here are the commands that you can use on me:`);

		client.commands.forEach(command => {
			messageEmbed.addField(command.name, command.description);
		});

		message.channel.send(messageEmbed);
	},
};