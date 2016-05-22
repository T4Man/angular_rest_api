module.exports = function(app) {
  app.directive('bandListItem', () => {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/band_list_item.html',
      scope: {
        band: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeBand;
      }
    };
  });
};
