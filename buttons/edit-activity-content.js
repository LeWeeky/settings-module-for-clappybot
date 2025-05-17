const { MessageFlags } = require("discord.js");
const { getContentModal } = require("../utils/modals/content");
const { isCreator } = require("../utils/permissions/isCreator");
const { getActivity } = require("../utils/search/activity");

const startCustomId = "mybotsettings-edit-activity-content-";

function startsWith(interaction)
{
	return (interaction.customId.startsWith(startCustomId));
}

async function parse(interaction)
{
	const id = parseInt(interaction.customId.substring(startCustomId.length));
	const activity = getActivity(id);

	if (!activity)
		interaction.reply({content: "Sorry but, this activity has been withdrawn.", flags: [MessageFlags.Ephemeral]})
	else
		interaction.showModal(getContentModal(activity))
}

module.exports = {
	parse,
	conditions: [startsWith],
	permissions: [isCreator],
	any_guild: false,
	dm: false
}