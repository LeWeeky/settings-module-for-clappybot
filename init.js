const { clappybot } = require("../../main")
const { Status } = require("./models/Status")

async function init_module(connection)
{
	Status.use(clappybot.database);
	await Status.init();

	globalThis.bot_activities = await Status.all();
}

module.exports = {
	init_module
}