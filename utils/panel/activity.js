const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { colors } = require("../../../../libraries/colors");
const { displayActivity } = require("../display/activity");
const { getActivity } = require("../search/activity");

/**
 * 
 * @param {number} id 
 * @returns 
 */
function getActivityAndContentPanel(id = 0)
{
	const activity = getActivity(id);

	if (!activity && id != 0)
	{
		const embed = new EmbedBuilder()
		.setColor(colors.red)
		.setDescription(
			"# 💬 Activity & Status\n"+
			"This activity has been withdrawn"
		)
		return ({embeds: [embed], components: []})
	}

	let type = "*Not defined*";
	let content = "*Not defined*";

	if (activity)
	{
		type = displayActivity(activity.type);
		if (activity.content)
			content = activity.content;
	}

	const embed = new EmbedBuilder()
	.setColor(colors.lilac)
	.setDescription(
		"# 💬 Activity\n"+
		"Here, activity can be customized in 2 ways: \n"+
		`- 🎉 Type: ${type}\n`+
		`- 💬 Content: ${content}`
	)

	const row1 = new ActionRowBuilder()
	.setComponents(
		new StringSelectMenuBuilder()
		.setCustomId(`mybotsettings-set-activity-type-${id}`)
		.setPlaceholder("Choose a status")
		.setOptions([
			{
				emoji: "🎮",
				label: "Playing",
				value: "0"
			},
			{
				emoji: "👾",
				label: "Streaming",
				value: "1"
			},
			{
				emoji: "👂",
				label: "Listening",
				value: "2"
			},
			{
				emoji: "👀",
				label: "Watching",
				value: "3"
			}
		])
	)

	const row2 = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
		.setCustomId(`mybotsettings-edit-activity-content-${id}`)
		.setEmoji("📝")
		.setLabel("Edit content")
		.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
		.setCustomId(`mybotsettings-delete-activity-${id}`)
		.setEmoji("🗑️")
		.setLabel("Delete")
		.setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
		.setCustomId(`mybotsettings-back-to-activities`)
		.setEmoji("🚪")
		.setLabel("Back to activities")
		.setStyle(ButtonStyle.Secondary)
	)

	return ({embeds: [embed], components: [row1, row2]})
}

module.exports = {
	getActivityAndContentPanel
}