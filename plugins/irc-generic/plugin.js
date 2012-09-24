var Hook = require('hook.io').Hook;
var color = require('colors')
var hook = new Hook( {
   	name: 'irc-plugin'
	, silent: true
} );

var commands = {}

commands[".meeting"] = "No meeting scheduled, Location TBD"

hook.on("irc::msg", function (data) {
	if (data.nick == undefined) return	

	print (data.to,data.nick,data.text)
	
	if (data.to[0] != "#")
		data.to = data.nick



	var each = data.text.split(" ")
	var command = each[0]
	var text = data.text.substr(command.length + 1, data.text.length)	
	
	if (command == ".help")
	{
		switch(each[1])
		{
			case ".speak":
				say ( data.nick, "WSUTech", ".speak tells the bot to speak to the channel" ) 
				say ( data.nick, "WSUTech", ".speak [Channel] [Text]")
				say ( data.nick, "WSUTech", ".speak #wsutech Hello everyone!")
			break;
			

	}		

	}

	if (commands[command] != undefined)
		return say ( data.to, "WSUTech", commands[data.text])
	
	if (command == ".update")
		return commands[each[1]] = text.substr(each[1].length + 1, text.length)

	if (command == ".speak")
		return say ( each[1], "WSUTech", text.substr(each[1].length + 1, text.length))

});

hook.start();

function print (to,from,msg)
{
		if (to[0] == "#")
			console.log( (padr(to, 15) + "").magenta + "| ".grey + (padl(from, 15) +"").cyan + " :: ".grey + msg)
		else	
			console.log( (padr(">"+to+"<", 15) + "").red + "| ".grey + (padl(from, 15) +"").cyan + " :: ".grey + msg)
}

function say (to, from,  msg)
{ 
		print (to,from,msg)
		hook.emit("irc::msg", {"to":to,"msg":msg})
}

function padl(str, len, chr) {
  var s;

  if (!chr) {
    chr = ' ';
  }

  s = str;

  if (str.length < len) {
    for (var i = 0; i < (len - str.length); i++) {
      s = chr + s;
    }
  }

  return s;
}


function padr(str, len, chr) {
  var s;

  if (!chr) {
    chr = ' ';
  }

  s = str;

  if (str.length < len) {
    for (var i = 0; i < (len - str.length); i++) {
      s += chr;
    }
  }

  return s;
}
