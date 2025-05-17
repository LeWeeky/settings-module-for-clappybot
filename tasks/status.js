const { clappybot } = require("../../../main");
const { Random } = require("../../../libraries/random_numbers");
const { replaceByVariables } = require("../../../libraries/formating/replace");
const { ActivityType } = require("discord.js");
const { version } = require("../../../../package.json");

let internval_id = null;

async function setStatus()
{
	let last_index = -1;
	internval_id = setInterval(
        async function ()
        {
			if (!clappybot.bot.user)
				return ;
            if (!globalThis.guild_id)
				return (clappybot.bot.user.setActivity('In configuration ⚙', {type: ActivityType.Streaming, url: 'https://www.twitch.tv/leweeky'}));

            let guild = clappybot.getGuild();

            if (guild)
            {
				if (globalThis.bot_activities.length == 0)
				{
					clappybot.bot.user.setStatus("idle")
					clappybot.bot.user.setActivity("⚠️", {
                        type: ActivityType.Custom
                    });
					return ;
				}

				let twitch = `https://www.twitch.tv/${clappybot.config.twitch}`;
				let content = "";
				let type = 0;
                clappybot.bot.user.setStatus(clappybot.config.status)
				if (clappybot.config.status == "invisible")
					return ;

                if (globalThis.bot_activities.length > 0)
                {
                    const i = new Random(0,  globalThis.bot_activities.length).next();
					if (i == last_index)
						return ;
					last_index = i;
                    content = globalThis.bot_activities[i].content
					type =  globalThis.bot_activities[i].type;

					if (content)
                    	content = await replaceByVariables(guild.members.cache.get(clappybot.bot.user.id), content);
                }

				clappybot.bot.user.setActivity(content, {
					type: type, url: twitch, state: `clappybot v${version}`
				});
            }

            else

            {
                clappybot.bot.user.setStatus("idle")
            }
        }
    , 7500);
}

function start()
{
	setStatus();
}

function stop()
{
	if (internval_id)
		clearInterval(internval_id);
}

module.exports = {
	start, stop
}