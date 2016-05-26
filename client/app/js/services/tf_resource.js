module.exports = function(app) {
  app.factory('tfResource', ['$http', 'handleError', function($http, tfError) {
    var Resource = function(resourceArr, errorsArr, baseUrl, options) {
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
      this.options = options || {};
      this.options.errMessages = this.options.errMessages || {};
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for(var i = 0; i < res.data.length; i++)
            this.data.push(res.data[i]);
        }, tfError(this.errors, this.options.errMessages.getAll ||'could not fetch resource'))
    };

    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, tfError(this.errors, this.options.errMessages.create || 'could not save resource'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(tfError(this.errors, this.options.errMessages.update ||'could not update resource'));
    };

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, tfError(this.errors, this.options.errMessages.remove || 'could not remove the resource'));
    };
    return Resource;
  }]);
};
