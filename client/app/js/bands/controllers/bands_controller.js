const baseUrl = require('../../config').baseUrl;
const angular = require('angular');
// const angularApp = angular.module('angularApp', []);
// require('../../services/tf_resource')(app);

module.exports = function(app) {
  app.controller('BandsController', ['tfResource', function(Resource) {
    this.bands = [];
    this.errors = [];
    var remote = new Resource(this.bands, this.errors, baseUrl + '/api/bands');
    var original = {};

    this.getAll = remote.getAll().bind(remote);

    this.createBand = function() {
      remote.create(this.newBand)
        .then((res) => {
          this.bands.push(res.data);
          this.newBand = null;
        });
    }.bind(this);

    this.updateBand = function(band) {
      remote.put(band)
        .then((res) => {
          band.editing = false;
        });
    }.bind(this);

    this.removeBand = function(band) {
      remote.delete(band)
        .then((res) => {
          this.bands.splice(this.bands.indexOf(band), 1);
        });
    }.bind(this);

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
};
