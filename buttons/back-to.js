const { MessageFlags } = require("discord.js");
const { isCreator } = require("../utils/permissions/isCreator");
const { getMainPanel } = require("../utils/panel/main");
const { getActivitiesAndStatusPanel } = require("../utils/panel/activities");

const startCustomId = "mybotsettings-back-to-";

function startsWith(interaction)
{
	return (interaction.customId.startsWith(startCustomId));
}

async function parse(interaction)
{
	const target = interaction.customId.substring(startCustomId.length);

	switch (target)
	{
		case "main":
			interaction.update(getMainPanel())
			return;
		case "activities":
			interaction.update(getActivitiesAndStatusPanel())
			return;
	}
}

module.exports = {
	parse,
	conditions: [startsWith],
	permissions: [isCreator],
	any_guild: false,
	dm: false
}