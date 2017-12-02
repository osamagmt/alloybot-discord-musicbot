/********************
* Alloybot Discord Musicbot
* Command: addsc.js
*********************/

module.exports = function(Module, Commands) {
  Module[`addsc`] = main;
  const _INFO = {
    name: `addsc`,
    desc: `Adds a song from soundcloud to the playlist via Link or Search terms. (Picks the first sound in the search results)`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof Commands === 'array') Commands.push(_INFO);
}