const { Status } = require("../models/Status");
const { getActivityAndContentPanel } = require("../utils/panel/activity");
const { isCreator } = require("../utils/permissions/isCreator");

async function parse(interaction)
{
	const option = interaction.values[0]

	if (option == "add")
	{
		const activity = await Status.create({type: 0});
		globalThis.bot_activities.push(activity)
		interaction.update(getActivityAndContentPanel(activity.id))
		return;
	}
	interaction.update(getActivityAndContentPanel(parseInt(option)))
}

module.exports = {
	parse,
	customId: "mybotsettings-activity",
	permissions: [isCreator],
	any_guild: false,
	dm: false
}