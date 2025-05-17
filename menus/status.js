const { clappybot } = require("../../../main");
const { getActivitiesAndStatusPanel } = require("../utils/panel/activities");
const { isCreator } = require("../utils/permissions/isCreator");

async function parse(interaction)
{
	const wait = interaction.deferUpdate();
	clappybot.config.status = interaction.values[0];
	await clappybot.config.save();
	await wait;
	interaction.message.edit(getActivitiesAndStatusPanel());
}

module.exports = {
	parse,
	customId: "mybotsettings-status-type",
	permissions: [isCreator],
	any_guild: false,
	dm: false
}