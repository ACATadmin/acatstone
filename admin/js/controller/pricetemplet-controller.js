/*
 * @Author: glory.huis 
 * @Date: 2018-05-23 17:00:19 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-07-06 16:21:49
 */
app.controller("pricetemplet", function ($scope, $http, $state, modal) {
  $scope.search = {
    "name": ""
  };
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/pricetemplate?page=" + page + "&name=" + $scope.search.name).success(function (response) {
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
      $scope.search.name = "";
      $scope.selectPage(0);
    }

      //下架
  $scope.dropoff = function (item) {
    modal.dialog("您确定要下架此模板吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/pricetemplate/dropoff/" + item.id).success(function (response) {
        modal.alert("下架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }

   //广告上架
   $scope.shelf = function (item) {
    modal.dialog("您确定要上架此模板吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/pricetemplate/shelf/" + item.id).success(function (response) {
        modal.alert("上架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }
  
}).controller("pricetempletEdit", function ($scope, $http, $state,$compile,$stateParams) {
      //返回
      $scope.goback = function () {
        $state.go("app.application.priceTemplet");
      }
      $scope.title = "新增"
      $scope.price = []
      $scope.amount = []

      $scope.parsePriceAmount= function(priceConfig){
          var item = priceConfig.split(";")
          for(var i= 0;i<item.length;i++){
            if(item[i]!=""){
              $scope.price[i] = item[i].split("-")[0]
              $scope.amount[i] = item[i].split("-")[1]
            }
          }
      }


      if($stateParams.id != null&&$stateParams.id !=""){
        $scope.title = "修改"
        $http.get($scope.app.BaseUrl+"/admin/pricetemplate/"+$stateParams.id).success(function(response){
          $scope.item = response.data
          $scope.priceCountChange()
        }).error(function(data){
          alert(data.msg);
          $state.go("app.application.priceTemplet");
        })
      }
    $scope.priceCountChange = function(){
      // angular.element("#priceConfig").html("");
      var html = ""
      if($scope.item.priceCount > 0){
        for(var i =0;i<$scope.item.priceCount;i++){
          var tmp = "";
          if(i==0){
            tmp = "<div class='w-full-2 clearfix m-b-sm'><label class='col-sm-4 control-label'>"+
            "<em class='text-danger'>*</em> 价格配置：</label><div class='col-sm-8'><span class='text-danger'>"+(i+1)+"、</span>"+
            "<input type='text' ng-model='price["+i+"]' class='form-control inline w-xs '> ACAT<input type='text' ng-model='amount["+i+"]'  class='form-control inline w-xs  m-l-xs'>次</div></div>"
          }else{
            tmp =  "<div class='w-full-2 clearfix m-b-sm'><label class='col-sm-4 control-label'>"+
            "</label><div class='col-sm-8'><span class='text-danger'>"+(i+1)+"、</span>"+
            "<input type='text' ng-model='price["+i+"]' class='form-control inline w-xs '> ACAT<input type='text' ng-model='amount["+i+"]'  class='form-control inline w-xs  m-l-xs'>次</div></div>"
          }
            html += tmp
        }
      }
       angular.element("#priceConfig").html($compile(html)($scope));
       if($scope.item.priceConfig){
        $scope.parsePriceAmount($scope.item.priceConfig)
       }
    }


    //表单验证
    $scope.validate = {
      "name": true,
      "priceCount": true,
      "priceConfig": true
    }

    $scope.validateCheck = function () {
      if($scope.item.name == null || $scope.item.name == ""){
        $scope.validate.name = false
      }else{
          $scope.validate.name = true
      }
      if($scope.item.priceCount == null || $scope.item.priceCount == ""){
        $scope.validate.priceCount = false
      }else{
          $scope.validate.priceCount = true
      }

      if($scope.price == null || $scope.amount == null){
        $scope.validate.priceConfig = false
      }else if($scope.price.length != $scope.item.priceCount  || $scope.amount.length != $scope.item.priceCount){
        $scope.validate.priceConfig = false
      }else if($scope.item.priceConfig == null || $scope.item.priceConfig == ""){
        $scope.validate.priceConfig = false
      }else{
        $scope.validate.priceConfig = true
      }
  
      if ($scope.validate.name &&
        $scope.validate.priceCount &&
        $scope.validate.priceConfig ) {
        return true;
      }
      return false;
  
    }

    $scope.parsePriceConfig = function(){
      console.log("price:"+$scope.price)
      console.log("amount:"+$scope.amount)
      var vals = ""
      for(var i=0;i<$scope.price.length;i++){
        vals +=$scope.price[i]+"-"+$scope.amount[i]+";";
        console.log($scope.price[i] )
        console.log($scope.amount[i] )
      }
      $scope.item.priceConfig = vals;
      
    }
  
    $scope.save = function(){
      $scope.parsePriceConfig()
        if(!$scope.validateCheck() ){
            return
        }else{
          $http.post($scope.app.BaseUrl+"/admin/pricetemplate/",$scope.item).success(function(response){
            alert("保存成功")
            $state.go("app.application.priceTemplet");
          }).error(function(data){
          alert(data.msg);
        })
        }
    }


})