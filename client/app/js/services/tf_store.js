module.exports = function(app) {
  app.factory('tfStore', ['$rootScope', function($rs) {
    return {
      count: 0,
      addCount: function() {
        this.count++;
      },
      minusCount: function() {
        this.count--;
      },
      getCount: function() {
        return this.count;
      }
    }
  }]);
};
