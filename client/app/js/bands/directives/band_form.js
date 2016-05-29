module.exports = function(app) {
  app.directive('bandForm', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/band_form.html',
      scope: {
        band: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateBand,
          create: controller.createBand
        };
        scope.save = cruds[scope.crud];
      }
    };
  });
};
