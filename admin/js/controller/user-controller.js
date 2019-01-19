/*
 * @Author: glory.huis 
 * @Date: 2018-05-25 15:41:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-12 23:13:51
 */
app.controller("users", function ($scope, $http, $state, modal, $modal) {
    $scope.search = {
        "number": "",
        "nickname": ""
    };
    $scope.selectPage = function (page) {
        $http.get($scope.app.BaseUrl + "/admin/user?page=" + page + "&number=" + $scope.search.number + "&nickname=" + $scope.search.nickname).success(function (response) {
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
        $scope.search.number = "";
        $scope.search.nickname = "";
        $scope.selectPage(0);
    }
    //编辑一个用户
    $scope.editUser = function (item) {
        $state.go("app.user.edit", {
            id: item.id
        });
    }

    //充值@loyin
    $scope.rechargeUser = function (item) {
        $state.go("app.user.recharge", {
            id: item.id
        });
    }

    //启用用户
    $scope.enable = function (item) {
        modal.dialog("您确定要启用此用户吗？", function () {
            $http.get($scope.app.BaseUrl + "/admin/user/enable/" + item.id).success(function (response) {
                modal.alert("启用成功!");
                $state.reload();
            }).error(function (data) {
                modal.alert(data.error);
            })
        })
    }
    //禁用用户
    $scope.disable = function (item) {
        modal.dialog("您确定要禁用此用户吗？", function () {
            $http.get($scope.app.BaseUrl + "/admin/user/disable/" + item.id).success(function (response) {
                modal.alert("禁用成功!");
                $state.reload();
            }).error(function (data) {
                modal.alert(data.error);
            })
        })
    }

}).controller("user", function ($scope, $http, $state, $stateParams, modal, $modal) {
    //获取id
    if ($stateParams.id != undefined && $stateParams.id != "") {
        //获取数据
        $http.get($scope.app.BaseUrl + "/admin/user/" + $stateParams.id).success(function (response) {
            $scope.item = response.data;
        }).error(function (data) {
            alert(data.message);
        })
    }
    $scope.updateUser = function () {
        //修改用户的免费次数
        if($scope.item.freeCount <0 ||$scope.item.freeCount >999){
            alert("免费次数只能为0到999!");
            return
        }
        $http.put($scope.app.BaseUrl + "/admin/user", $scope.item).success(function (response) {
            alert("修改成功!");
            $state.go("app.user.list");
        }).error(function (data) {
            alert(data.message);
        })
    }


    //充值 by loyin
    $scope.recharge = function () {
        //充值
        if($scope.item.freeCount <0 ||$scope.item.freeCount >999){
            alert("免费次数只能为0到999!");
            return
        }
        $http.put($scope.app.BaseUrl + "/admin/user", $scope.item).success(function (response) {
            alert("充值成功!");
            $state.go("app.user.list");
        }).error(function (data) {
            alert(data.message);
        })
    }

    //返回
    $scope.goback = function () {
        $state.go("app.user.list");
    }
}).controller("userrecharge",function($scope,$state,$http,$stateParams){
    $scope.apps = []
    $http.get($scope.app.BaseUrl + "/admin/application/select").success(function (response) {
        $scope.apps = response.data;
    }).error(function (data) {
        alert(data.message);
    })

    $scope.userRecharge = function(){
        if($scope.item.appId == ""){
            alert("请选择充值产品！");
            return
        }
        console.log($scope.item.appId+":"+$scope.item.rechargeCount)
        if($scope.item.count <0 ||$scope.item.count >9999){
            alert("充值次数只能为0到9999!");
            return
        }
        $scope.item.userId = $stateParams.id
        $http.put($scope.app.BaseUrl + "/admin/recharge/",$scope.item).success(function(response){
            alert("充值成功")
            $state.go("app.user.rechargelist");
        }).error(function(data){
            alert(data.message);
        })
    }
    //返回
    $scope.goback = function () {
        $state.go("app.user.list");
    }
}).controller("rechargeList",function($scope,$http){
    $scope.search = {
        "username": "",
        "employeename": ""
    };
    $scope.selectPage = function (page) {
        $http.get($scope.app.BaseUrl + "/admin/recharge?page=" + page + "&username=" + $scope.search.username + "&employeename=" + $scope.search.employeename).success(function (response) {
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
        $scope.search.username = "";
        $scope.search.employeename = "";
        $scope.selectPage(0);
    }
}).controller("costList",function($scope,$http){
    $scope.search = {
        "username": "",
    };
    $scope.selectPage = function (page) {
        $http.get($scope.app.BaseUrl + "/admin/cost?page=" + page + "&username=" + $scope.search.username).success(function (response) {
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
        $scope.search.username = "";
        $scope.selectPage(0);
    }
})