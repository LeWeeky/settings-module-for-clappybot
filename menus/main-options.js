const { getPrefixModal } = require("../utils/modals/prefix");
const { getTwitchModal } = require("../utils/modals/twitch");
const { getActivitiesAndStatusPanel } = require("../utils/panel/activities");
const { isCreator } = require("../utils/permissions/isCreator");

async function parse(interaction)
{
	const option = interaction.values[0]

	switch (option)
	{
		case "prefix":
			await interaction.showModal(getPrefixModal())
			return;
		case "twitch":
			await interaction.showModal(getTwitchModal())
			return;
		case "activity":
			await interaction.update(getActivitiesAndStatusPanel())
			return;
	}

	interaction.deferUpdate();
}

module.exports = {
	parse,
	customId: "mybotsettings-main-options",
	permissions: [isCreator],
	any_guild: false,
	dm: false
}