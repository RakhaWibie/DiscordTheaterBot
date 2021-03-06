# Discord Theater Server Bot

This is a Discord Bot that is being created for my friend's Discord server.

## Feature

* Messages the server at 12:00pm EST every Tuesday saying "React to this message by tonight if you're watching (insert movie title from playing next) this Wednesday at 8pm!"
* Messages a similar reminder 1 hour before, 30 minutes before, 10 minutes before, and when the movie time starts.
* Reminds people when the next movie is.

## Commands

Commands for this bot are prefixed by the `-` symbol.

* `help`: prints out a list of commands that the bot can respond to.
* `remind` or `next`: gives back the name of the upcoming movie.
* `ping`: a simple ping-pong that can only be run by privileged members.

## TO DO

* Add a `remind-me` command to DM user about when the next movie is.

## How to Use

1. Clone the repo to download all the code in this project.
2. Paste the TOKEN of your Discord Bot in the `.env` file next to `DISCORD_BOT_TOKEN`. If you don't have a Discord Bot set up, you can watch [this video by CodeLyon](https://www.youtube.com/watch?v=j_sD9udZnCk) for how to set one up.
3. Make sure to configure the constants set in `constants.js` to your own server's needs.
4. Run the command `node .` to start the Discord bot.
5. ???
6. Profit :)

## Credits

Thank you CodeLyon for providing the basis on how to start a simple Discord bot. You can view their YouTube channel at <https://www.youtube.com/channel/UC08G-UJT58SbkdmcOYyOQVw>.
