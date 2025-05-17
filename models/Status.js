const { AModel } = require("../../../libraries/models/AModel");

class Status extends AModel
{
	static table = 'status';
	static fields = {
		content: 'string',
		type: 'integer'
	};
}

module.exports = {
	Status
}