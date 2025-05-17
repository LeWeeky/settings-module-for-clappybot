const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const { colors } = require("../../../../libraries/colors");
const { clappybot } = require("../../../../main");

function getMainPanel()
{
	const embed = new EmbedBuilder()
	.setDescription(
		"# ⚙️ Settings menu\n"+
		"Welcome to the settings, pleaze choose an option below.\n\n"+
		"This module only takes general parameters into account, but you're free to add to them and even publish your additions to the git repository!\n\n"+
		`⌨️ **Prefix:** ${clappybot.config.prefix ?? "*Not defined*"}\n`+
		`👾 **Twitch channel:** ${clappybot.config.twitch ?? "*Not defined*"}`
	)
	.setColor(colors.lilac)

	const row = new ActionRowBuilder()
	.setComponents(
		new StringSelectMenuBuilder()
		.setCustomId("mybotsettings-main-options")
		.setOptions([
			{
				emoji: "✍️",
				label: "Prefix",
				description: "The character(s) preceding the command.",
				value: "prefix",
			},
			{
				emoji: "💬",
				label: "Activity & Status",
				description: "What am I doing ?",
				value: "activity",
			},
			{
				emoji: "👾",
				label: "Twitch",
				description: "The twitch channel to show in the activity.",
				value: "twitch",
			}
		])
	)
	return ({embeds: [embed], components: [row]});
}

module.exports = {
	getMainPanel
}