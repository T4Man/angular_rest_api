$scope.edit = function () {
    $scope.editing = true;
    $scope.copy = angular.copy($scope.data);
};

$scope.cancel = function () {
    $scope.editing = false;
    $scope.data = $scope.copy;
};
