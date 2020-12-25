/* eslint-disable no-unused-vars */
// Read environment variables from your .env file
require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');
const scheduledTimes = require('./constants');

const client = new Discord.Client();

const prefix = '-';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('The Discord Theater server bot is online...');

	// Cron jobs to run remind command on a schedule -- i.e. every Tuesday at 12:00PM EST
	for (const cronTime in scheduledTimes.timeExpressions) {
		if (cronTime != 'default') {
			scheduleCronJob(cronTime.toString());
		}
	}
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, client, args);
	}
	else if (command === 'remind') {
		client.commands.get('remind').execute(message, client, 'default');
	}
});

const scheduleCronJob = (cronTime) => {
	cron.schedule(cronTime, () => {
		console.log(`Running the scheduled reminder at ${Date.now()}`);
		client.commands.get('remind').execute(null, client, cronTime);
	}, {
		timezone: 'America/New_York',
	});
};

// Start up the discord bot
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
if (discordBotToken) {
	client.login(discordBotToken);
}
else {
	console.log('You need to set the Discord Bot Token within the .env file.');
}


// Shutdown process (CTRL + C)
process.on('SIGINT', () => {
	console.log('The bot is shutting down...');
	process.exit();
});