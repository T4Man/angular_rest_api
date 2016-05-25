const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BandsController', ['$http', 'handleError', function($http, handleError) {
    this.bands = [];
    this.errors = [];
    var original = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/bands')
        .then((res) => {
          this.bands = res.data;
        }, handleError(this.errors, 'Could not retrieve bands'));
    }.bind(this);

    this.createBand = function() {
      $http.post(baseUrl + '/api/bands', this.newBand)
        .then((res) => {
          this.bands.push(res.data);
          this.newBand = null;
        }, handleError(this.errors, 'Could not create band '));
    }.bind(this);

    this.updateBand = function(band) {
      $http.put(baseUrl + '/api/bands/' + band._id, band)
        .then(() => {
          band.editing = false;
        }, handleError(this.errors, 'Could not update band '));
    }.bind(this);

    this.removeBand = function(band) {
      $http.delete(baseUrl + '/api/bands/' + band._id)
        .then(() => {
          this.bands.splice(this.bands.indexOf(band), 1);
        }, handleError(this.errors, 'Could not remove band'));
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
