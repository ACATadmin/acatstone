app.controller("markets",function($scope,$http){
    $scope.flag = -1
    $http.get($scope.app.BaseUrl+"/api/banner/nav").success(function(response){
        if(response.data != null&&response.data.length>0){
            $scope.flag = 1
            $scope.items = response.data
        }else{
            $scope.flag = 0
        }
    })
})