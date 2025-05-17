const { Status } = require("../../models/Status");

function getActivity(id)
{
	if (id == 0)
		return (null)
	for (let i = 0; i < globalThis.bot_activities.length; i++)
	{
		if (globalThis.bot_activities[i].id == id)
		return (globalThis.bot_activities[i]);
	}
	return (null);
}

module.exports = {
	getActivity
}