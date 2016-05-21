module.exports = function(app) {
  app.directive('bandListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/bands/directives/band_list_item.html',
      scope: {
        band: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeBand;
      }
    }
  })
}
