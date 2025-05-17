const { TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");

function getContentModal(activity)
{
	const modal = new ModalBuilder()
			.setCustomId(`mybotsettings-activity-content-${activity.id}`)
			.setTitle('Set a new content');
	
	const content = new TextInputBuilder()
		.setCustomId('content')
		.setLabel("Set a new activity content")
		.setStyle(TextInputStyle.Short)
		.setMaxLength(128)
		.setMinLength(1)

	if (activity.content)
		content.setValue(activity.content)



	const row = new ActionRowBuilder().addComponents(content);

	modal.addComponents(row);

	return (modal)
}

module.exports = {
	getContentModal
}