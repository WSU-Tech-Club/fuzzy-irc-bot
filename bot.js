var IRC = require('hook.io-irc').IRC;

var irc = new IRC( {
	name: 'irc',
	useShell: "true"
});

irc.start();
