const baseUrl = require('../../config').baseUrl;
const angular = require('angular');
// const angularApp = angular.module('angularApp', []);
// require('../../services/tf_resource')(app);

module.exports = function(app) {
  app.controller('SongsController', ['tfResource', function(Resource) {
    this.songs = [];
    this.bands = [];
    this.errors = [];
    var remote = new Resource(this.songs, this.errors, baseUrl + '/api/songs');
    var original = {};

    this.getAll = remote.getAll.bind(remote);


    this.createSong = function() {
      remote.create(this.newSong)
        .then((res) => {
          this.songs.push(res.data);
          this.newSong = null;
        });
    }.bind(this);

    this.updateSong = function(song) {
      remote.put(song)
        .then((res) => {
          song.editing = false;
        });
    }.bind(this);

    this.removeSong = function(song) {
      remote.delete(song)
        .then((res) => {
          this.songs.splice(this.songs.indexOf(song), 1);
        });
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
