function isCreator(member)
{
	return (member.id == process.env.AUTHOR_ID);
}

module.exports = {
	isCreator
}