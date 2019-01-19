/*
 * @Author: glory.huis 
 * @Date: 2018-05-21 18:32:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-12 23:10:54
 */

app.controller("banners", function ($scope, $http, $state, modal, $modal) {
  $scope.search = {
    "name":""
}
  
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/banner?page=" + page+"&name="+$scope.search.name).success(function (response) {
      $scope.items = response.data.content;
      $scope.number = response.data.number + 1;
      $scope.totalPages = response.data.totalPages;
      $scope.totalElements = response.data.totalElements;
      $scope.size = response.data.size;
    }).error(function (data) {
      alert(data.msg);
    })
  }

  //刷新-重置搜索框
  $scope.reflushAll = function () {
    $scope.search.name = "";
    $scope.selectPage(0);
  }

  //广告下架
  $scope.dropoff = function (item) {
    modal.dialog("您确定要下架此广告吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/banner/dropoff/" + item.id).success(function (response) {
        modal.alert("下架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }

   //广告上架
   $scope.shelf = function (item) {
    modal.dialog("您确定要上架此广告吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/banner/shelf/" + item.id).success(function (response) {
        modal.alert("上架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }



}).controller("bannerEditCtrl", function ($scope, $http, $state,$stateParams,modal) {
  //返回
  $scope.goback = function () {
    $state.go("app.content.banner");
  }

  $scope.id = $stateParams.id
  $http.get($scope.app.BaseUrl+"/admin/banner/"+$scope.id).success(function(response){
    $scope.item = response.data
  }).error(function(data){
    alert(data.msg);
    $state.go("app.content.banner");
  })

    //表单验证
    $scope.validate = {
      "name": true,
      "urlpath": true,
      "bannerimg": true,
    }

  $scope.validateCheck = function () {
    if($scope.item.name == null || $scope.item.name == ""){
      $scope.validate.name = false
    }else{
        $scope.validate.name = true
    }
    if ($scope.validate.name) {
      return true;
    }
    return false;

  }

  $scope.save = function(){
      if ($scope.validateCheck()) {
        $http.put($scope.app.BaseUrl+"/admin/banner/"+$scope.id,$scope.item).success(function(response){
            alert("修改成功")
            $state.go("app.content.banner");
          }).error(function(data){
          alert(data.msg);
        })
      }else{
        console.log($scope.item)
      }
  }

  $scope.selectPage = function(page){
    $http.get($scope.app.BaseUrl+"/admin/bannerphoto/banner/"+$scope.id+"?page="+page).success(function(response){
      $scope.items = response.data.content
      $scope.number = response.data.number + 1;
      $scope.totalPages = response.data.totalPages;
      $scope.totalElements = response.data.totalElements;
      $scope.size = response.data.size;
    }).error(function(data){
      alert(data.msg)
    })
  }

   //下架
   $scope.dropoff = function (item) {
    modal.dialog("您确定要下架此广告轮播图吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/bannerphoto/dropoff/" + item.id).success(function (response) {
        modal.alert("下架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }

   //上架
   $scope.shelf = function (item) {
    modal.dialog("您确定要上架此广告轮播图吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/bannerphoto/shelf/" + item.id).success(function (response) {
        modal.alert("上架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }


}).controller("bannerPhotoEditCtrl",function($scope,$http,$stateParams,$state){
      //表单验证
      $scope.validate = {
        "urlpath": true,
        "bannerimg": true,
      }
  
    $scope.validateCheck = function () {
      if($scope.item.urlpath == null || $scope.item.naurlpathe == ""){
        $scope.validate.urlpath = false
      }else{
          $scope.validate.urlpath = true
      }
      if($scope.item.bannerimg == null || $scope.item.bannerimg == ""){
        $scope.validate.bannerimg = false
      }else{
          $scope.validate.bannerimg = true
      }
      if ($scope.validate.urlpath && $scope.validate.bannerimg) {
        return true;
      }
      return false;
  
    }


  $scope.bannerId = $stateParams.bannerId

  if($stateParams.id != ""){
    $http.get($scope.app.BaseUrl+"/admin/bannerphoto/"+$stateParams.id).success(function(response){
        $scope.item = response.data
    }).error(function(data){
      alert(data.msg)
      $state.go("app.content.banner_edit_add",{id:$stateParams.bannerId})
    })
  }

  $http.get($scope.app.BaseUrl+"/admin/banner/"+$scope.bannerId).success(function(response){
    $scope.banner = response.data
  }).error(function(data){
    alert(data.msg)
  })

  $scope.save = function(){
    if ($scope.validateCheck()) {
      $scope.item.bannerId = $scope.bannerId
      if($stateParams.id != ""){
        $scope.item.id = $stateParams.id 
      }
      $http.post($scope.app.BaseUrl+"/admin/bannerphoto/",$scope.item).success(function(response){
          alert("保存成功")
          $state.go("app.content.banner_edit_add",{id:$stateParams.bannerId})
        }).error(function(data){
        alert(data.msg);
      })
    }else{
      console.log($scope.item)
    }
  }

})