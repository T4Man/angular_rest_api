const handleError = require('../../lib').handleError;
const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BandsController', ['$http', function($http) {

    this.bands = [];
    var original = {};

    this.getAll = () => {
      $http.get(baseUrl + '/api/bands')
        .then((res) => {
          this.bands = res.data;
        }, handleError.bind(this));
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
};
