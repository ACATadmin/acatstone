app.controller("headerController", function ($scope, $http, $state, modal, $modal) {
    //查询用户信息
    $http.get($scope.app.BaseUrl + "/admin/employee/islogin").success(function (response) {
        if (response.data.sucflag) {
            $scope.app.employeeT = response.data.employeeT;
            $scope.app.employeeLogT = response.data.employeeLogT;
        } else {
            $state.go("access.signin");
        }
    }).error(function (data) {
        $state.go("access.signin");
    })
    //登出
    $scope.logout = function () {
        $http.get($scope.app.BaseUrl + "/admin/employee/logout").success(function (response) {
            $state.go("access.signin");
        }).error(function (data) {
            $state.go("access.signin");
        })
    }
})