const handleError = require('../../lib').handleError;
const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['$http', function($http) {

    this.songs = [];
    var original = {};

    this.getAll = () => {
      $http.get(baseUrl + '/api/songs')
        .then((res) => {
          this.songs = res.data;
        }, handleError.bind(this));
    };

    this.createSong = () => {
      $http.post(baseUrl + '/api/songs', this.newSong)
        .then((res) => {
          this.songs.push(res.data);
          this.newSong = null;
        }, handleError.bind(this));
    };

    this.updateSong = (song) => {
      $http.put(baseUrl + '/api/songs/' + song._id, song)
        .then(() => {
          song.editing = false;
        }, handleError.bind(this));
    };

    this.removeSong = (song) => {
      $http.delete(baseUrl + '/api/songs/' + song._id)
        .then(() => {
          this.songs.splice(this.songs.indexOf(song), 1);
        }, handleError.bind(this));
    };

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
}
