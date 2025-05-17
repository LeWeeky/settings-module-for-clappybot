const { clappybot } = require("../../../main");
const { getMainPanel } = require("../utils/panel/main");
const { isCreator } = require("../utils/permissions/isCreator");

async function parse(interaction)
{
	const wait = interaction.deferUpdate();
	const twitch = interaction.fields.getTextInputValue('twitch');

	clappybot.config.twitch = twitch;
	await clappybot.config.save();
	await wait;
	interaction.message.edit(getMainPanel())
}

module.exports = {
	parse,
	customId: "mybotsettings-twitch",
	permissions: [isCreator],
	any_guild: false,
	dm: false
}