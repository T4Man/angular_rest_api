const baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BandsController', ['tfResource', 'tfStore', function(SrcInfo, tfStore) {
    this.bands = [];
    this.genres = [];
    this.errors = [];
    this.counter = tfStore;
    this.getCount = tfStore.getCount.bind(tfStore);
    this.add = tfStore.addCount.bind(tfStore);
    this.minus = tfStore.minusCount.bind(tfStore);

    var remote = new SrcInfo(this.bands, this.errors, baseUrl + '/api/bands');
    var original = {};

    this.getAll = remote.getAll.bind(remote);

    this.createBand = function() {
      remote.save(this.newBand)
        .then(() => {
          this.newBand = null;
        });
    }.bind(this);

    this.updateBand = function(band) {
      remote.update(band)
        .then(() => {
          band.editing = false;
        });
    };

    this.removeBand = remote.remove.bind(remote);

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
