var Hook = require('hook.io').Hook;
var cradle = require('cradle')
var color = require('colors')
var hook = new Hook( {
   	name: 'irc-savechat'
} );

var conn  = new(cradle.Connection)()
var db    = conn.database('irc')

function now() {
  var date = new Date
  return [
      date.getUTCFullYear()
    , date.getUTCMonth()
    , date.getUTCDate()
    , date.getUTCHours()
    , date.getUTCMinutes()
    , date.getUTCSeconds()
  ]
}

hook.on("irc::msg", function (data) {
    db.save({
        collection: 'msg'
      , date: now()
      , payload: data
    })
})

hook.start()
