const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['$http', 'handleError', function($http, handleError) {
    this.songs = [];
    this.bands = [];
    var original = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/songs')
        .then((res) => {
          this.songs = res.data;
        }, handleError(this.errors, 'Could not retrieve songs'));
    }.bind(this);

    this.createSong = function() {
      $http.post(baseUrl + '/api/songs', this.newSong)
        .then((res) => {
          this.songs.push(res.data);
          this.newSong = null;
        }, handleError(this.errors, 'Could not create song '));
    }.bind(this);

    this.updateSong = function(song) {
      $http.put(baseUrl + '/api/songs/' + song._id, song)
        .then(() => {
          song.editing = false;
        }, handleError(this.errors, 'Could not update song '));
    }.bind(this);

    this.removeSong = function(song) {
      $http.delete(baseUrl + '/api/songs/' + song._id)
        .then(() => {
          this.songs.splice(this.songs.indexOf(song), 1);
        }, handleError(this.errors, 'Could not remove song '));
    }.bind(this);

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
