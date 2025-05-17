const { SlashCommandBuilder } = require("discord.js");

const { CHANNELS_TABLE } = require("../../../libraries/data");

function isCreator(member)
{
	return (member.id == process.env.AUTHOR_ID);
}

async function parse(interaction, cmd, args)
{
	// Set the current channel as the one for announcements
	// updates and information.
	if (interaction.options)
	{
		const channel = interaction.options.getChannel("channel");
		await CHANNELS_TABLE.set(`channel.support`, channel.id);
		// Slash command (/command)
		interaction.reply({content: `Announcements will be sent to <#${channel.id}> from now on!`})
	}
	else
	{
		// Classic command (+command)
		if (args.length == 0)
		{
			interaction.channel.send("Sorry but, you forgot to mention channel ID!")
		}
		else if (args.length == 1)
		{
			if (interaction.guild.channels.cache.has(args[0]))
			{
				await CHANNELS_TABLE.set(`channel.support`, args[0]);
				interaction.reply({content: `Announcements will be sent to <#${args[0]}> from now on!`})
			}
			else
			{
				interaction.channel.send(`Sorry but, \`${args[0]}\` is not a channel ID!`)
			}
		}
		else
		{
			interaction.channel.send("Sorry but, you've given too much arguments!")
		}
	}
}

module.exports = {
	parse,
	name: "setsupport",
	permissions: [
		isCreator
	],
	builder: new SlashCommandBuilder()
	.setName("setsupport")
	.setDescription("Defines a channel as the \"support channel\".")
	.addChannelOption(option => 
		option.setName("channel")
		.setDescription("All announcements of clappybot updates will be sent here.")
		.setRequired(true)
	)
	.setDefaultMemberPermissions(0),
	any_guild: false,
	dm: false
}