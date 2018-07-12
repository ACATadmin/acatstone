/*!
 * journal-controller.js
 * User: 徐佳乐.
 * Date: 2018/6/6.
 * Time: 17:58.
 */
app.controller("journals", function ($scope, $http, $state, modal, $modal) {
    $scope.selectPage = function (page) {
        $http.get($scope.app.BaseUrl+"/admin/index/employeelog?page=" + page).success(function (response) {
            $scope.items = response.data.content;
            $scope.number = response.data.number + 1;
            $scope.totalPages = response.data.totalPages;
            $scope.totalElements = response.data.totalElements;
            $scope.size = response.data.size;
        }).error(function (data) {
            alert(data.message);
        })
    }
    //刷新-重置搜索框
    $scope.reflushAll = function () {
        $scope.selectPage(0);
    }
});