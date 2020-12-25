// Set your playingNextChannel variables here.
const otherChannel = {
	otherChannelName: 'playing-next',
	otherChannelBotId: '235536762389135360',
};

// Set your Guild (server ID) info here.
const guildInfo = {
	guildId: '791787492515905596',
};

// Set your privileged (admin / permissioned) role id here.
const privilegedRole = {
	roleId: '791792436145684500',
};

// Scheduled reminders
const timeExpressions = {
	'0 12 * * Tuesday': 'this Wednesday at 8pm',
	'0 19 * * Wednesday': 'in one hour',
	'30 19 * * Wednesday': 'in thirty minutes',
	'50 19 * * Wednesday': 'in ten minutes',
	'0 20 * * Wednesday': 'now',
	'default' : 'this Wednesday at 8pm',
};

module.exports = { otherChannel, guildInfo, privilegedRole, timeExpressions };