app.controller("modifypassword", function ($scope, $http, $state, modal, $modal) {
    $scope.item = {
        "oldpassword": "",
        "password": "",
        "repassword": ""
    }
    $scope.validate = {
        "oldpassword": false,
        "password": false,
        "repassword": false,
        "repassword2": false
    }
    //表单验证
    $scope.formvalidation = function () {
        let a = true;
        let b = true;
        let c = true;
        let d = true;
        if ($scope.item.oldpassword == undefined || $scope.item.oldpassword == "") {
            a = true;
            $scope.validate.oldpassword = true;
        } else {
            a = false;
            $scope.validate.oldpassword = false;
        }
        if ($scope.item.password == undefined || $scope.item.password == "") {
            b = true;
            $scope.validate.password = true;
        } else {
            b = false;
            $scope.validate.password = false;

        }
        if ($scope.item.repassword == undefined || $scope.item.repassword == "") {
            c = true;
            $scope.validate.repassword = true;
        } else {
            c = false;
            $scope.validate.repassword = false;
        }
        if ($scope.item.password != $scope.item.repassword) {
            d = true;
            $scope.validate.repassword2 = true;
            
        } else {
            d = false;
            $scope.validate.repassword2 = false;
            
        }
        if (!a && !b && !c && !d) {
            //返回可以
            return false;
            
        }
        return true;
    }
    

    //修改密码
    $scope.save = function () {
        if(!$scope.formvalidation()){
            $http.put($scope.app.BaseUrl + '/admin/employee/password', $scope.item).success(function (data, status, headers, config) {
                sessionStorage.clear();
                modal.alert("修改密码成功,请重新登录");
                $state.go("access.signin");
            }).error(function (error) {
                modal.alert(error.msg);
            })
        }
    }
})