'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$sessionStorage', function ($scope, $http, $state,$sessionStorage) {
  $scope.user = {};
  $scope.authError = null;
  $scope.login = function () {
    $scope.authError = null;
    // Try to login
    $http.post($scope.app.BaseUrl + '/admin/employee/login', $scope.user).success(function (data, status, headers, config) {
      // $http.defaults.headers.common['X-Auth-Token'] = headers("x-auth-token");
      sessionStorage.setItem("X-Auth-Token",headers("x-auth-token"));
      $scope.app.employeeT = data.data.employeeT;
      $sessionStorage.permissions = data.data.permissions;
      $state.go('app.home.journal');
    }).error(function (error) {
      $scope.authError = error.msg;
    })
  };
}])