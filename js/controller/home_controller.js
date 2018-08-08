/*!
 * home_controller.js
 * User: 徐佳乐.
 * Date: 2018/5/21.
 * Time: 14:22.
 */
// app.controller('homeCtrl', ['$scope', function ($scope) {
app.controller("homeCtrl", function ($scope, $http, $state, $stateParams, modal, $modal) {
    $scope.nologin = true;
    $scope.islogin = false;
    //判断是否登录
    $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
        //已登录-显示退出按钮
        $scope.nologin = false;
        $scope.islogin = true;
    })


    $(function () {
        $('#dowebok').fullpage({
            verticalCentered: false,
        });
    });
    $scope.golist = function () {
        $state.go("app.text_list", {
            type: 1
        })
    }
    $scope.goLogin = function () {
        $state.go("app.login")
    }
    $scope.goLogout = function () {
        $http.get($scope.app.BaseUrl + "/api/user/logout").success(function (response) {
            sessionStorage.removeItem("X-Auth-Token-H5");
            layer.msg("Logout success", {
                offset: ['90%', '33%']
            });
            $state.go("app.login");
        })

    }
    //是否刷新页面
    // if($stateParams.reload){
    //     $state.reload();
    //     $stateParams.reload=false;
    // }
}).controller("footerCtrl", function ($scope, $http, $state, $stateParams, modal, $modal) {
    $scope.goLogin = function () {
        //判断是否登录-如果登录了，就跳转已登录页
        $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
            $state.go("app.haslogin");
        }).error(function (data) {
            if (data.code == 404) {
                $state.go("app.login", {});
            }
        })
    }
})