const { MessageFlags } = require("discord.js");
const { isCreator } = require("../utils/permissions/isCreator");
const { getActivity } = require("../utils/search/activity");
const { getActivityAndContentPanel } = require("../utils/panel/activity");

const startCustomId = "mybotsettings-activity-content-"

function startsWith(interaction)
{
	return (interaction.customId.startsWith(startCustomId));
}

async function parse(interaction)
{
	const id = parseInt(interaction.customId.substring(startCustomId.length));
	const content = interaction.fields.getTextInputValue('content');
	const activity = getActivity(id);

	if (!activity)
	{
		interaction.reply({content: "Sorry but, this activity has been withdrawn.", flags: [MessageFlags.Ephemeral]})
		return ;
	}
	activity.content = content;
	activity.save();
	interaction.update(getActivityAndContentPanel(id));
}

module.exports = {
	parse,
	conditions: [startsWith],
	permissions: [isCreator],
	any_guild: false,
	dm: false
}