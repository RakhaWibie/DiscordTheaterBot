// Set your playingNextChannel variables here.
const otherChannel = {
	otherChannelName: 'playing-next',
	otherChannelBotId: '709271563110973451',
};

// Set your Guild (server ID) info here.
const guildInfo = {
	guildId: '690308425850421309',
};

// Set your privileged (admin / permissioned) role id here.
const privilegedRole = {
	roleId: '735991575317840013',
};

// Set the color of the embeds that the bot sends.
const embedColor = {
	colorHex: 0xFF69B4,
};

// Scheduled reminders -- i.e. every Tuesday at 12:00PM EST
const timeExpressions = {
	'0 12 * * Tuesday': 'this Wednesday at 8pm',
	'0 19 * * Wednesday': 'in one hour',
	'30 19 * * Wednesday': 'in thirty minutes',
	'50 19 * * Wednesday': 'in ten minutes',
	'0 20 * * Wednesday': 'now',
	'default' : 'this Wednesday at 8pm',
};

module.exports = { otherChannel, guildInfo, privilegedRole, embedColor, timeExpressions };