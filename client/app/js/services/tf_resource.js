module.exports = function(app) {

  const reqFulfill = function(cb) {
    return function(res) {
      cb(null, res.data);
    };
  };

  const reqReject = function(cb) {
    return function(res) {
      cb(res);
    };
  };

  const baseUrl = 'http://localhost:3000';

  app.factory('tfResource', ['$http', 'handleError', function($http, tfError) {
    var Resource = function(resourceName, baseUrl) {
      //this.data = resourceName;
      this.url = baseUrl;
    };

    Resource.prototype.getAll = function(cb) {
      $http.get(baseUrl + '/api/bands')
        .then(reqFulfill(cb), reqReject(cb));
    }, tfError(this.errors || 'Could not retrieve bands');

    Resource.prototype.create = function(data, cb) {
      $http.post(this.url + '/api/' + this.resourceName, data)
        .then(reqFulfill(cb), reqReject(cb));
    }, tfError(this.errors || 'Could not create band');

    Resource.prototype.update = function(data, cb) {
      $http.put(this.url + '/api/' + this.resourceName + '/' + data._id, data)
        .then(reqFulfill(cb), reqReject(cb));
    }, tfError(this.errors || 'Could not update band');

    Resource.prototype.delete = function(data, cb) {
      $http.delete(this.url + '/api/' + this.resourceName + '/' + data._id)
        .then(reqFulfill(cb), reqReject(cb));
    }, tfError(this.errors || 'Could not delete band');

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
