const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['tfResource', 'tfStore', function(SrcInfo, tfStore) {
    this.songs = [];
    this.bands = [];
    this.errors = [];
    this.counter = tfStore;
    this.getCount = tfStore.getCount.bind(tfStore);
    this.add = tfStore.addCount.bind(tfStore);
    this.minus = tfStore.minusCount.bind(tfStore);

    var remote = new SrcInfo(this.songs, this.errors, baseUrl + '/api/songs');
    var original = {};

    this.getAll = remote.getAll.bind(remote);

    this.createSong = function() {
      remote.save(this.newSong)
        .then(() => {
          this.newSong = null;
        });
    }.bind(this);

    this.updateSong = function(song) {
      remote.update(song)
        .then(() => {
          song.editing = false;
        });
    };

    this.removeSong = remote.remove.bind(remote);

    this.cancel = (song) => {
      song.editing = false;
      song.title = original.title;
      song.bandName = original.bandName;
    };

    this.edit = (song) => {
      song.editing = true;
      original.title = song.title;
      original.bandName = song.bandName;
    };

  }]);
};
