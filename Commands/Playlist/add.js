/********************
* NonShitMusicBot.js
* Command: add.js
*********************/

module.exports = function(Module) {
  Module[`add`] = main;
}

function main(Message) {
  const Core = require('../index.js');
  let self = { Core: Core }, Embed = Core.Modules.Libs.RichEmbed(), Playlists, PastPlaylists, Content;

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Core.DB.has('PastPlaylists')) { PastPlaylists = Core.DB.get('PastPlaylists') }
  else { PastPlaylists = {}; Core.DB.put('PastPlaylists', PastPlaylists) };

  if (!Playlists[Message.guild.id]) { Playlists[Message.guild.id] = new Core.Cassette.Playlist() };

  if (!PastPlaylists[Message.guild.id]) { PastPlaylists[Message.guild.id] = new Core.Cassette.Playlist() };

  Content = Message.content.split(' ');
  Content.shift();
  Content = Content.join(' ');

  if (Content.search('&list=')) { addplaylist() }
  else { addsong() };

  function addsong() {
    Playlists[Message.guild.id].add(Content, [Core.YTService], { searchType: 'song' })
    .then(function(Song) {
      Embed.fields = [{name: 'Song Name', value: `[${Song[0].title}](${Song[0].streamURL})`}];
      Message.channel.send(`**Added song to playlist.**`, Embed);
      self.Core.DB.put('PastPlaylists', PastPlaylists);
      self.Core.DB.put('Playlists', Playlists);
      Embed = undefined;
    }).catch(function(error) {
      console.error(error);
    });
  }

  function addplaylist() {
    Playlists[Message.guild.id].add(Content, [Core.YTService], { searchType: 'playlist' })
    .then(function(Song) {
      let embedplaylist = [];
      Song.forEach(function(item) {
        embedplaylist.push(`**${embedplaylist.length + 1}**. [${item.title}](${item.streamURL})`);
      });
      Embed.fields = [{name: 'Song list', value: embedplaylist.join('\r\n')}];
      Message.channel.send(`**Added songs to playlist.**`, Embed);
      self.Core.DB.put('PastPlaylists', PastPlaylists);
      self.Core.DB.put('Playlists', Playlists);
      Embed = undefined;
    }).catch(function(error) {
      console.error(error);
    });
  }
}