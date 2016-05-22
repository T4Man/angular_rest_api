module.exports = function(app) {
  app.directive('songListItem', () => {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/song_list_item.html',
      scope: {
        song: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeSong;
      }
    };
  });
};
