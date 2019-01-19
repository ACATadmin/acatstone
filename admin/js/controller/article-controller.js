app.controller("articles",function($scope,$http,$state,modal){
    $scope.search = {
        "title":"",
        "type":""
    }
    $scope.selectPage = function(page){
        $http.get($scope.app.BaseUrl + "/admin/article?page=" + page + "&title=" + $scope.search.title + "&type=" + $scope.search.type).success(function (response) {
            $scope.items = response.data.content;
            $scope.number = response.data.number + 1;
            $scope.totalPages = response.data.totalPages;
            $scope.totalElements = response.data.totalElements;
            $scope.size = response.data.size;
          }).error(function (data) {
            modal.alert(data.msg);
          })
    }
  //刷新-重置搜索框
  $scope.reflushAll = function () {
    $scope.search.title = "";
    $scope.search.type = "";
    $scope.selectPage(0);
  }

  $scope.edit = function(id){
    $state.go("app.content.text_edit_add",{"id":id});
  }

  //文章下架
  $scope.dropoff = function (item) {
    modal.dialog("您确定要下架此文章吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/article/dropoff/" + item.id).success(function (response) {
        modal.alert("下架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }

   //文章上架
   $scope.shelf = function (item) {
    modal.dialog("您确定要上架此文章吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/article/shelf/" + item.id).success(function (response) {
        modal.alert("上架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }
}).controller("articleEdit",function($scope,$http,$state,$stateParams,modal){
    $scope.pageTitle = "新增"
    $scope.item = {
        "title": "",
        "source": "",
        "releasTime": "",
        "type": "",
        "aimg": "",
        "content": "",
    }

    if($stateParams.id != undefined && $stateParams.id != ""){
        $scope.pageTitle = "编辑"
        //获取数据
    $http.get($scope.app.BaseUrl + "/admin/article/" + $stateParams.id).success(function (response) {
        $scope.item = response.data;
      }).error(function (data) {
        modal.alert(data.msg);
      })
    }

  //表单验证
  $scope.validate = {
    "title": true,
    "titleSize": true,
    "source": true,
    "releasTime": true,
    "type": true,
    "aimg": true,
    "content": true,
  }

   //展开时间
   $scope.openstime = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stimeOpened = true;
  };


  $scope.validateCheck = function () {
    if($scope.item.title == null || $scope.item.title == ""){
        $scope.validate.title = false
    }else{
        $scope.validate.title = true
    }
    if($scope.item.title.length > 100){
      $scope.validate.titleSize = false
    }else{
      $scope.validate.titleSize = true
    }
    if($scope.item.source == null || $scope.item.source == ""){
        $scope.validate.source = false
    }else{
        $scope.validate.source = true
    }
    if($scope.item.releasTime == null || $scope.item.releasTime == ""){
        $scope.validate.releasTime = false
    }else{
        $scope.validate.releasTime = true
    }
    if($scope.item.type == "-1" ){
        $scope.validate.type = false
    }else{
        $scope.validate.type = true
    }
    if($scope.item.aimg == null || $scope.item.aimg == ""){
        $scope.validate.aimg = false
    }else{
        $scope.validate.aimg = true
    }
    if($scope.item.content == null || $scope.item.content == ""){
        $scope.validate.content = false
    }else{
        $scope.validate.content = true
    }

    if ($scope.validate.title &&
        $scope.validate.titleSize &&
        $scope.validate.source &&
        $scope.validate.releasTime &&
        $scope.validate.type &&
        $scope.validate.aimg &&
        $scope.validate.content) {
        return true;
      }
      return false;
  }

  $scope.save = function(){
    if ($scope.validateCheck()) {
          $http.post($scope.app.BaseUrl + "/admin/article/", $scope.item).success(function (response) {
            modal.alert("保存成功!");
            $state.go("app.content.text");
          }).error(function (data) {
            modal.alert(data.msg);
          })
      }else{
        console.log($scope.item);
        console.log( $scope.validate.type)
      }
  }
})