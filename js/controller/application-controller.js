app.controller("applications", function ($scope, $http, $state, $stateParams, modal, $modal) {
  //获取类型
  $scope.type = $stateParams.type;
  //获取列表
  $http.get($scope.app.BaseUrl + "/api/application?page=0&size=10&type=" + $scope.type).success(function (response) {
    $scope.items = response.data.content;
  }).error(function (data) {
    layer.msg(data.msg, {
      offset: ['90%', '33%']
    });
  })
  //查看详情
  $scope.goDetails = function (id) {
    $state.go("app.forecast_details", {
      "appid": id,
      "type": $scope.type
    });
  }
}).controller("application", function ($scope, $http, $state, $stateParams, modal, $modal) {
  // $scope.islogin = false;
  $scope.useCount = 0;
  //获取详情
  $http.get($scope.app.BaseUrl + "/api/application/" + $stateParams.appid).success(function (response) {
    $scope.item = response.data.applicationT;
    $scope.useCount = response.data.allCount;
    $scope.appScreens = $scope.app.BaseUrl + $scope.item.appScreens;
    // layer.msg("获取列表!",{offset:'b'});        
  }).error(function (data) {
    layer.msg(data.msg, {
      offset: ['90%', '33%']
    });

  })
  //判断是否登录
  // $http.get($scope.app.BaseUrl + "/api/user/isloginapp").success(function (response) {
  //   if(response.data.islogin){
  //     //如果登录-显示用户的正常的次数
  //     if(response.data.userT.freeCount>0){
  //       $scope.useCount= response.data.userT.freeCount;
  //     }
  //     $scope.islogin = true;
  //   }

  // }).error(function (data) {
  //   //未登录
  //   // $scope.useCount = $scope.item.useCount;
  // })
  $scope.goDetails = function (id) {
    //如果登录-扣次数-跳转
    // if ($scope.islogin) {
    //调用接口进行数字减少操作
    $state.go("app.to_predict", {
      "appid": id,
      "type": $stateParams.type
    });
    // } else {
    //没登录-跳转去登录      
    // $state.go("app.login");
    // }
  }
  //返回上一页
  $scope.gobackpage = function () {
    $state.go("app.text_list", {
      "type": $stateParams.type
    });
  }
}).controller("lacktimeController", function ($scope, $http, $state, $stateParams, modal, $modal) {
    //返回上一页
    $scope.gobackpage = function () {
      $state.go("app.text_list", {
        "type": $stateParams.type
      });
    }
})
