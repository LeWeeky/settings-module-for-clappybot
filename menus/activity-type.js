const { getActivityAndContentPanel } = require("../utils/panel/activity");
const { isCreator } = require("../utils/permissions/isCreator");
const { getActivity } = require("../utils/search/activity");

const startCustomId = "mybotsettings-set-activity-type-";

function startsWith(interaction)
{
	return (interaction.customId.startsWith(startCustomId));
}

async function parse(interaction)
{
	const option = interaction.values[0]
	const id =  parseInt(interaction.customId.substring(startCustomId.length));
	const activity = getActivity(id);

	if (activity)
	{
		activity.type = parseInt(option);
		activity.save();
	}
	interaction.update(getActivityAndContentPanel(id))
}

module.exports = {
	parse,
	conditions: [startsWith],
	permissions: [isCreator],
	any_guild: false,
	dm: false
}