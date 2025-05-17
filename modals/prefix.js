const { MessageFlags } = require("discord.js");
const { clappybot } = require("../../../main");
const { isCreator } = require("../utils/permissions/isCreator");
const { getMainPanel } = require("../utils/panel/main");

async function parse(interaction)
{
	const wait = interaction.deferUpdate();
	const prefix = interaction.fields.getTextInputValue('prefix');

	clappybot.prefix = clappybot.config.prefix = prefix;
	await clappybot.config.save();
	await wait;
	interaction.message.edit(getMainPanel())
}

module.exports = {
	parse,
	customId: "mybotsettings-prefix",
	permissions: [isCreator],
	any_guild: false,
	dm: false
}