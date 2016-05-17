const angular = require('angular');
const angularApp = angular.module('angularApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

angularApp.controller('BandsController', ['$http', function($http) {

  this.bands = [];
  var original = {};

  this.getAll = () => {
    $http.get(baseUrl + '/api/bands')
      .then((res) => {
        this.bands = res.data;
      },handleError.bind(this));
  };

  this.createBand = () => {
    $http.post(baseUrl + '/api/bands', this.newBand)
      .then((res) => {
        this.bands.push(res.data);
        this.newBand = null;
      }, handleError.bind(this));
  };

  this.updateBand = (band) => {
    $http.put(baseUrl + '/api/bands/' + band._id, band)
      .then(() => {
        band.editing = false;
      }, handleError.bind(this));
  };

  this.removeBand = (band) => {
    $http.delete(baseUrl + '/api/bands/' + band._id)
      .then(() => {
        this.bands.splice(this.bands.indexOf(band), 1);
      }, handleError.bind(this));
  };

  this.cancel = (band) => {
    band.editing = false;
    band.bandName = original.bandName;
    band.genre = original.genre;
  };

  this.edit = (band) => {
    band.editing = true;
    original.bandName = band.bandName;
    original.genre = band.genre;
  };

}]);

angularApp.controller('SongsController', ['$http', function($http) {
  this.songs = [];
  var original = {};

  this.getAll = () => {
    $http.get(baseUrl + '/api/songs')
      .then((res) => {
        this.songs = res.data;
      },handleError.bind(this));
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
