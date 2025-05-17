const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { colors } = require("../../../../libraries/colors");
const { displayActivity } = require("../display/activity");
const { clappybot } = require("../../../../main");

function getContents()
{
	const options = [];

	for (let i = 0; i < globalThis.bot_activities.length; i++)
	{
		options.push({
			value: String(globalThis.bot_activities[i].id),
			label: displayActivity(globalThis.bot_activities[i].type),
			description: globalThis.bot_activities[i].content
		})
	}
	return (options);
}

function displayStatus(status)
{
	switch (status) {
		case "online":
			return ("🟢 Online");
		case "idle":
			return ("🟡 Idle");
		case "dnd":
			return ("🔴 Do not disturb");
		case "dnd":
			return ("🔘 Invisible");
		default:
			return ("*Not defined*");
	}
}

function getActivitiesAndStatusPanel()
{
	const embed = new EmbedBuilder()
	.setDescription(
		"# 💬 Activity & Status\n"+
		"Here, activity can be customized in 3 ways: \n"+
		`- 📡 Status: ${displayStatus(clappybot.config.status)}\n`+
		"- 🎉 Activity type: watching, listening, playing, streaming\n"+
		"- 💬 Activity content: a sentence representing the activity\n"
	)
	.setColor(colors.lilac)

	const row1 = new ActionRowBuilder()
	.setComponents(
		new StringSelectMenuBuilder()
		.setCustomId("mybotsettings-status-type")
		.setPlaceholder("Choose a status")
		.setOptions([
			{
				emoji: "🟢",
				label: "Online",
				value: "online"
			},
			{
				emoji: "🟡",
				label: "Idle",
				value: "idle"
			},
			{
				emoji: "🔴",
				label: "Do not disturb",
				value: "dnd"
			},
			{
				emoji: "🔘",
				label: "Invisible",
				value: "invisible"
			}
		])
	)

	const options = getContents();

	if (options.length < 25)
	{
		options.push({
			emoji: "➕",
			label: "Add an activity",
			value: "add"
		})
	}

	const row2 = new ActionRowBuilder()
	.setComponents(
		new StringSelectMenuBuilder()
		.setPlaceholder("Choose or add an activity")
		.setCustomId("mybotsettings-activity")
		.setOptions(options)
	)

	const row3 = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
		.setCustomId(`mybotsettings-back-to-main`)
		.setEmoji("🚪")
		.setLabel("Back to main")
		.setStyle(ButtonStyle.Secondary)
	)

	return ({embeds: [embed], components: [row1, row2, row3]})
}

module.exports = {
	getActivitiesAndStatusPanel
}