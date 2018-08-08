app.controller("navCtrl", function ($scope, $http, $state, modal, $modal, $rootScope) {
    $scope.islogin = true;
    $scope.islogout = false;

    $scope.islogin = function () {
        //判断是否登录
        $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
            //登陆了
            $scope.islogin = false;
            $scope.islogout = true;
            $scope.email = response.data.email;

        }).error(function (response) {
            //未登录
            $scope.islogin = true;
            $scope.islogout = false;
        })
    }
    $scope.islogin();

    // 监听事件
    $rootScope.$on('siginSuccess', function (event, data) {
        if (data) {
            //判断是否登录
            $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
                //登陆了
                $scope.islogin = false;
                $scope.islogout = true;
                $scope.email = response.data.email;
            }).error(function (response) {
                //未登录
                $scope.islogin = true;
                $scope.islogout = false;
            })
        }
    })


    $scope.logout = function () {
        $http.get($scope.app.BaseUrl + "/api/user/logout").success(function (response) {
            sessionStorage.removeItem("X-Auth-Token-H5");
            layer.msg("Logout success", {
                offset: ['90%', '33%']
            });
            $state.reload();
        })
    }
}).controller("goIndexCtrl", function ($scope, $http, $state, modal, $modal, $rootScope) {
    $scope.goIndex = function () {
        //NAV收回去
        $('#asidediv').removeClass('show off-screen');
        $('#headerbtn').removeClass('active');
        $state.go("app.home");
    }
})