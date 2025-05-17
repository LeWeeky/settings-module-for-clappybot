const { MessageFlags } = require("discord.js");
const { isCreator } = require("../utils/permissions/isCreator");
const { getActivity } = require("../utils/search/activity");
const { Status } = require("../models/Status");
const { getActivitiesAndStatusPanel } = require("../utils/panel/activities");

const startCustomId = "mybotsettings-delete-activity-";

function startsWith(interaction)
{
	return (interaction.customId.startsWith(startCustomId));
}

async function parse(interaction)
{
	const wait = interaction.deferUpdate();
	const id = parseInt(interaction.customId.substring(startCustomId.length));
	const activity = getActivity(id);

	if (activity)
	{
		activity.delete();
		globalThis.bot_activities = await Status.all();
	}
	await wait;
	interaction.message.edit(getActivitiesAndStatusPanel());
}

module.exports = {
	parse,
	conditions: [startsWith],
	permissions: [isCreator],
	any_guild: false,
	dm: false
}