const { SlashCommandBuilder } = require("discord.js");
const { clappybot } = require("../../../main");
const { isCreator } = require("../utils/permissions/isCreator");

async function parse(interaction, cmd, args)
{
	// Set the current server as the bot's ‘owner’ server
	// this is where all functions can be executed
	// which have the ‘any_guild: false’ parameter
	clappybot.setGuild(interaction.guild.id)
	if (interaction.options)
	{
		// Slash command (/command)
		interaction.reply({content: "Guild updated!"})
	}
	else
	{
		// Classic command (+command)
		interaction.channel.send({content: "Guild updated!"})
	}
}

module.exports = {
	parse,
	name: "setguild",
	permissions: [
		isCreator
	],
	builder: new SlashCommandBuilder()
	.setName("setguild")
	.setDescription("Defines this server as the bot owner.")
	.setDefaultMemberPermissions(0),
	any_guild: true,
	dm: false
}