const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['tfResource', function(Resource) {
    this.songs = [];
    this.bands = [];
    this.errors = [];
    var remote = new Resource(this.songs, this.errors, baseUrl + '/api/songs', { errMessages: { getAll: 'custom error message' } } );
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
