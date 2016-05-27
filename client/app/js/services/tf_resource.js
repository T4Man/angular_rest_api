module.exports = function(app) {
  app.factory('tfResource', ['$http', 'handleError', function($http, tfError) {
    var SrcInfo = function(srcData, errData, baseUrl, options) {
      this.data = srcData;
      this.url = baseUrl;
      this.err = errData;
      this.options = options || {};
      this.options.errMess = this.options.errMess || {};
    };

    SrcInfo.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++)
            this.data.push(res.data[i]);
        }, tfError(this.err, this.options.errMess.getAll || 'could not find resource'));
    };

    SrcInfo.prototype.save = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, tfError(this.err, this.options.errMess.save || 'could not save resource'));
    };

    SrcInfo.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(tfError(this.err, this.options.errMess.update || 'could not update resource'));
    };

    SrcInfo.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, tfError(this.err, this.options.errMess.remove || 'could not remove the resource'));
    };
    return SrcInfo;
  }]);
};
