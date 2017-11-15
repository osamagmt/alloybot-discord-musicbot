/********************
* NonShitMusicBot.js
* Command: getdj.js
*********************/

module.exports = function(Modules) {
  Modules['Commands']['getdj'] = main;
}

function main(Message) {
  const Core = require('../index.js');
  let self = { Core: Core };
  let CurrentDJs;

  if (Core.DB.has('CurrentDJs')) {
    CurrentDJs = Core.DB.get('CurrentDJs');
    if (CurrentDJs[Message.guild.id]) { Message.channel.send(`The Current DJ is <@${CurrentDJs[Message.guild.id]}>.`) }
    else { Message.channel.send(`No one has been set as the DJ.`) }
  } else {
    CurrentDJs = {}; Core.DB.put('CurrentDJs', CurrentDJs);
    Message.channel.send(`No one has been set as the DJ.`);
  };
}