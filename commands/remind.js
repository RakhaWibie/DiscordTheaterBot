module.exports = {
    name: 'remind',
    description: 'Reminder to watch the movie every week',
    execute(message, client, args) {
        let channelToSend;

        // sends the message in #general if the command isn't called by someone
        if (!message) {
            channelToSend = client.channels.cache.find(channel => channel.name === 'general');
        } else {
            channelToSend = message.channel;
        }
        
        // sends reminder message and reacts to itself
        channelToSend.send(`React to this message by tonight if you're watching the movie tomorrow!`)
            .then(message => {
                message.react(`👍`);
                message.react(`👎`);
            })
            .catch(console.error);
    }
}