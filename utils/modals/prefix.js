const { TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { clappybot } = require("../../../../main");

function getPrefixModal()
{
	const modal = new ModalBuilder()
			.setCustomId('mybotsettings-prefix')
			.setTitle('Set a new prefix');
	
	const prefix = new TextInputBuilder()
		.setCustomId('prefix')
		.setLabel("Set character(s) before a comamnd")
		.setStyle(TextInputStyle.Short)
		.setValue(clappybot.config.prefix)
		.setMaxLength(3)
		.setMinLength(1);


	const row = new ActionRowBuilder().addComponents(prefix);

	modal.addComponents(row);

	return (modal)
}

module.exports = {
	getPrefixModal
}