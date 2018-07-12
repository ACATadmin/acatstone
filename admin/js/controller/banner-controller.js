/*
 * @Author: glory.huis 
 * @Date: 2018-05-21 18:32:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-12 23:10:54
 */

app.controller("banners", function ($scope, $http, $state, modal, $modal) {
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/banner?page=" + page).success(function (response) {
      $scope.items = response.data.content;
      $scope.number = response.data.number + 1;
      $scope.totalPages = response.data.totalPages;
      $scope.totalElements = response.data.totalElements;
      $scope.size = response.data.size;
    }).error(function (data) {
      alert(data.message);

    })
  }
}).controller("bannerEditCtrl", function ($scope, $http, $state, modal, $modal) {
  //返回
  $scope.goback = function () {
    $state.go("app.content.banner");
  }

})