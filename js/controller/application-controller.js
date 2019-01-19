app.controller("applications", function ($scope, $http, $state, $stateParams, modal, $modal,$timeout) {

  var locationNames = [
    "market_forecasting",
    "ace_indices",
    "techical_anaysis",
    "chance_discovery",
    "intelligent_diagnosis",
    "mulit_data",
    "risk_management",
    "asset_allocation",
    "trading_tools",
    "derivatives_market",
    "primary_market",
    "others"
  ]

  //获取类型
  $scope.type = $stateParams.type;

  //获取广告
  $scope.flag = -1
  $http.get($scope.app.BaseUrl+"/api/banner/"+locationNames[$scope.type - 1]).success(function(response){
      if(response.data != null&&response.data.length>0){
          $scope.flag = 1
          $scope.photos = response.data
      }else{
          $scope.flag = 0
      }
  })



  //获取列表
  // $http.get($scope.app.BaseUrl + "/api/application?page=0&size=10&type=" + $scope.type).success(function (response) {
  //   $scope.items = response.data.content;
  // }).error(function (data) {
  //   layer.msg(data.msg, {
  //     offset: ['90%', '33%']
  //   });
  // })
  //查看详情
  $scope.goDetails = function (item) {
    // if(item.type==0){
      $state.go("app.forecast_details", {
        "appid": item.id,
        "type": $scope.type
      });
    // }else{
    //   window.location.href=item.url
    // }
}
  $scope.items  = []
  $scope.page = 0

  $scope.loadData = function(page){
    $scope.last = false
    $scope.loading =true
    $http.get($scope.app.BaseUrl + "/api/application?page="+page+"&size=10&type=" + $scope.type).success(function(response){
        $scope.last = response.data.last
            $scope.items = $scope.items.concat(response.data.content)
            $scope.loading = false;
            if(!$scope.last){
                $scope.page ++ 
            }
    }).error(function(data){
        layer.msg(data.msg, {
            offset: ['90%', '33%']
        });
    $scope.loading = false;
    })
}
$scope.loadData(0)

}).controller("application", function ($scope, $http, $state, $stateParams,$location, modal, $modal) {
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
  $scope.goDetails = function (item) {
    //如果登录-扣次数-跳转
    // if ($scope.islogin) {
    //调用接口进行数字减少操作
    if(item.type == 0){
    $state.go("app.to_predict", {
      "appid": item.id,
      "type": $stateParams.type
    })
    }else{
      $http.get($scope.app.BaseUrl + "/api/application/"+item.id+"/third").success(function(response){
          window.location.href=item.url
      }).error(function(data){
        if (data.code == 404) {
          //未登录-判断sessionStorage中是否有登陆过的标记
          if (sessionStorage.getItem("ishaveLogin")) {
              layer.msg("please login again", {
                  offset: ['90%', '33%']
              });
              sessionStorage.removeItem("ishaveLogin");
          } else {
              layer.msg("please login", {
                  offset: ['90%', '33%']
              });
          }
          $state.go("app.login", {
              "reurl": $location.absUrl()
          });
      }else if(data.code == 400){
          //次数用完，跳转次数用完页面
          // layer.msg(data.msg, {
          //     offset: ['90%', '33%']
          // });
          $state.go("app.lacktime", {
              "appid": $stateParams.appid,
              "type": $stateParams.type
          });
      } else {
          layer.msg(data.msg, {
              offset: ['90%', '33%']
          });
      }
      })
    }
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
}).controller("carouselCtrl",function($scope,$http,$timeout){
  $timeout(function () {
    var _index = $("#owl-item").find(".item").length;
    if (_index == 1) {
      $('#owl-item').owlCarousel({
        items: 1,
        autoplay: true,
        nav: false,
        dots: false
      });
    } else {
      $('#owl-item').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        nav: false,
        dots: false
      });
    }
  }, 6000)
})
