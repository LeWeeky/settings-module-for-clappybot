const { TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { clappybot } = require("../../../../main");

function getTwitchModal()
{
	const modal = new ModalBuilder()
		.setCustomId('mybotsettings-twitch')
		.setTitle('Set a new twitch channel');
	
	const twitch = new TextInputBuilder()
		.setCustomId('twitch')
		.setLabel("Name of the twitch channel to display")
		.setStyle(TextInputStyle.Short)
		.setValue(clappybot.config.twitch)
		.setMaxLength(25)
		.setMinLength(3);

	const row = new ActionRowBuilder().addComponents(twitch);

	modal.addComponents(row);

	return (modal)
}

module.exports = {
	getTwitchModal
}