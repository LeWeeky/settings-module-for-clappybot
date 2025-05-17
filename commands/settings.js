const { SlashCommandBuilder } = require("discord.js");
const { isCreator } = require("../utils/permissions/isCreator");
const { getMainPanel } = require("../utils/panel/main");

async function parse(interaction, cmd, args)
{
	const panel = getMainPanel()

	if (interaction.options)
		interaction.reply(panel)
	else
		interaction.channel.send(panel)
}

module.exports = {
	parse,
	name: "settings",
	permissions: [
		isCreator
	],
	builder: new SlashCommandBuilder()
	.setName("settings")
	.setDescription("Change settings of this clappybot.")
	.setDefaultMemberPermissions(0),
	any_guild: false,
	dm: false
}