module.exports = function(app) {
  app.directive('bandForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/bands/directives/band_form.html',
      scope: {
        band: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateBand,
          create: controller.createBand,
          cancel: controller.cancelBand,
          edit: controller.editBand
        };
        scope.save = cruds[scope.crud];
      }
    }
  });
};
