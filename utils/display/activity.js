function displayActivity(activity)
{
	switch (activity) {
		case 0:
			return ("Playing ...");
		case 1:
			return ("Streaming ...");
		case 2:
			return ("Listening ...");
		case 3:
			return ("Watching ...");
		default:
			return ("???")
	}
}

module.exports = {
	displayActivity
}