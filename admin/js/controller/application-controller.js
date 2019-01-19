/*
 * @Author: glory.huis 
 * @Date: 2018-05-23 17:00:19 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-07-06 16:21:49
 */
app.controller("applications", function ($scope, $http, $state, modal, $modal) {
  $scope.search = {
    "appnumber": "",
    "appname": ""
  };
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/application?page=" + page + "&appnumber=" + $scope.search.appnumber + "&appname=" + $scope.search.appname).success(function (response) {
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
    $scope.search.appnumber = "";
    $scope.search.appname = "";
    $scope.selectPage(0);
  }
  //编辑一个应用
  $scope.editapp = function (item) {
    $state.go("app.application.edit", {
      id: item.id
    });
  }

  //应用下架
  $scope.dropoff = function (item) {
    modal.dialog("您确定要下架此应用吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/application/dropoff/" + item.id).success(function (response) {
        modal.alert("下架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }
  //应用上架
  $scope.shelf = function (item) {
    modal.dialog("您确定要上架此应用吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/application/shelf/" + item.id).success(function (response) {
        modal.alert("上架成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.msg);
      })
    })
  }
}).controller("applicationEdit", function ($scope, $http, $state, $stateParams, modal, $modal) {
  // $scope.item;
  //表单验证
  $scope.validate = {
    "name": true,
    "author": true,
    "appversion": true,
    "createTime": true,
    "apptype": true,
    "solgan": true,
    "summary": true,
    "icon": true,
    "appScreens": true,
    "useCount": true,
    "tag":true,
    "price":true,
    "coinname":true
  }
  if ($stateParams.id != undefined && $stateParams.id != "") {
    //获取数据
    $http.get($scope.app.BaseUrl + "/admin/application/" + $stateParams.id).success(function (response) {
      $scope.item = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //查询所有的分类
  $scope.findAllType = function () {
    $http.get($scope.app.BaseUrl + "/admin/application/types").success(function (response) {
      $scope.listtype = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //展开时间
  $scope.openstime = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stimeOpened = true;
  };

  $scope.validateCheck = function () {
    //应用名不能为空
    if ($scope.item.name == undefined || $scope.item.name == "") {
      $scope.validate.name = false;
    } else {
      $scope.validate.name = true;
    }
    if ($scope.item.author == undefined || $scope.item.author == "") {
      $scope.validate.author = false;
    } else {
      $scope.validate.author = true;
    }
    if ($scope.item.appversion == undefined || $scope.item.appversion == "") {
      $scope.validate.appversion = false;
    } else {
      $scope.validate.appversion = true;
    }
    if ($scope.item.createTime == undefined || $scope.item.createTime == "") {
      $scope.validate.createTime = false;
    } else {
      $scope.validate.createTime = true;
    }
    if ($scope.item.sort == undefined || $scope.item.sort == "") {
      $scope.validate.sort = false;
    } else {
      $scope.validate.sort = true;
    }
    if ($scope.item.apptype == undefined || $scope.item.apptype == "") {
      $scope.validate.apptype = false;
    } else {
      $scope.validate.apptype = true;
    }
    if ($scope.item.tag == undefined || $scope.item.tag == "") {
      $scope.validate.tag = false;
    } else {
      $scope.validate.tag = true;
    }
    if ($scope.item.useCount == undefined || $scope.item.useCount == "") {
      $scope.validate.useCount = false;
    } else {
      $scope.validate.useCount = true;
    }
    if ($scope.item.solgan == undefined || $scope.item.solgan == "") {
      $scope.validate.solgan = false;
    } else {
      $scope.validate.solgan = true;
    }
    if ($scope.item.summary == undefined || $scope.item.summary == "") {
      $scope.validate.summary = false;
    } else {
      $scope.validate.summary = true;
    }
    if ($scope.item.icon == undefined || $scope.item.icon == "") {
      $scope.validate.icon = false;
    } else {
      $scope.validate.icon = true;
    }
    if ($scope.item.appScreens == undefined || $scope.item.appScreens == "") {
      $scope.validate.appScreens = false;
    } else {
      $scope.validate.appScreens = true;
    }
    if ($scope.item.price == undefined || $scope.item.price == "") {
      $scope.validate.price = false;
    } else {
      $scope.validate.price = true;
    }
    if ($scope.item.coinname == undefined || $scope.item.coinname == "") {
      $scope.validate.coinname = false;
    } else {
      $scope.validate.coinname = true;
    }
    
    if ($scope.validate.name &&
      $scope.validate.author &&
      $scope.validate.appversion &&
      $scope.validate.createTime &&
      $scope.validate.apptype &&
      $scope.validate.solgan &&
      $scope.validate.summary &&
      $scope.validate.icon &&
      $scope.validate.appScreens &&
      $scope.validate.useCount &&
      $scope.validate.tag &&
      $scope.validate.price && 
      $scope.validate.coinname) {
      return true;
    }
    return false;
  }


  //点击提交
  //表单验证
  $scope.save = function () {
    if ($scope.validateCheck()) {
      if ($stateParams.id != undefined && $stateParams.id != "") {
        //修改
        $http.put($scope.app.BaseUrl + "/admin/application", $scope.item).success(function (response) {
          modal.alert("修改成功!");
          $state.go("app.application.list");
        }).error(function (data) {
          modal.alert(data.msg);
        })
      }
    }else{
      console.log($scope.item);
    }

  }

}).controller("applicationSave", function ($scope, $http, $state, $stateParams, modal, $modal) {
  //表单验证
  $scope.validate = {
    "name": true,
    "author": true,
    "appversion": true,
    "createTime": true,
    "apptype": true,
    "solgan": true,
    "summary": true,
    "icon": true,
    "appScreens": true,
    "useCount": true,
    "tag":true,
    "price":true,
    "coinname":true

  }
  $scope.item = {
    "name": undefined,
    "author": undefined,
    "appversion": undefined,
    "createTime": undefined,
    "apptype": undefined,
    "solgan": undefined,
    "summary": undefined,
    "icon": undefined,
    "appScreens": undefined,
    "useCount": undefined,
    "tag":undefined,
    "price":undefined,
    "coinname":undefined
  }
  $scope.validateCheck = function () {
    //应用名不能为空
    if ($scope.item.name == undefined || $scope.item.name == "") {
      $scope.validate.name = false;
    } else {
      $scope.validate.name = true;
    }
    if ($scope.item.author == undefined || $scope.item.author == "") {
      $scope.validate.author = false;
    } else {
      $scope.validate.author = true;
    }
    if ($scope.item.appversion == undefined || $scope.item.appversion == "") {
      $scope.validate.appversion = false;
    } else {
      $scope.validate.appversion = true;
    }
    if ($scope.item.createTime == undefined || $scope.item.createTime == "") {
      $scope.validate.createTime = false;
    } else {
      $scope.validate.createTime = true;
    }
    if ($scope.item.sort == undefined || $scope.item.sort == "") {
      $scope.validate.sort = false;
    } else {
      $scope.validate.sort = true;
    }
    if ($scope.item.apptype == undefined || $scope.item.apptype == "") {
      $scope.validate.apptype = false;
    } else {
      $scope.validate.apptype = true;
    }
    if ($scope.item.tag == undefined || $scope.item.tag == "") {
      $scope.validate.tag = false;
    } else {
      $scope.validate.tag = true;
    }
    if ($scope.item.useCount == undefined || $scope.item.useCount == "") {
      $scope.validate.useCount = false;
    } else {
      $scope.validate.useCount = true;
    }
    if ($scope.item.solgan == undefined || $scope.item.solgan == "") {
      $scope.validate.solgan = false;
    } else {
      $scope.validate.solgan = true;
    }
    if ($scope.item.summary == undefined || $scope.item.summary == "") {
      $scope.validate.summary = false;
    } else {
      $scope.validate.summary = true;
    }
    if ($scope.item.icon == undefined || $scope.item.icon == "") {
      $scope.validate.icon = false;
    } else {
      $scope.validate.icon = true;
    }
    if ($scope.item.appScreens == undefined || $scope.item.appScreens == "") {
      $scope.validate.appScreens = false;
    } else {
      $scope.validate.appScreens = true;
    }
    if ($scope.item.price == undefined || $scope.item.price == "") {
      $scope.validate.price = false;
    } else {
      $scope.validate.price = true;
    }
    if ($scope.item.coinname == undefined || $scope.item.coinname == "") {
      $scope.validate.coinname = false;
    } else {
      $scope.validate.coinname = true;
    }
    if ($scope.validate.name &&
      $scope.validate.author &&
      $scope.validate.appversion &&
      $scope.validate.createTime &&
      $scope.validate.apptype &&
      $scope.validate.solgan &&
      $scope.validate.summary &&
      $scope.validate.icon &&
      $scope.validate.appScreens && 
      $scope.validate.useCount &&
      $scope.validate.tag &&
      $scope.validate.price && 
      $scope.validate.coinname) {
      return true;
    }
    return false;
  }
  //展开时间
  $scope.openstime = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stimeOpened = true;
  };
  //查询所有的分类
  $scope.findAllType = function () {
    $http.get($scope.app.BaseUrl + "/admin/application/types").success(function (response) {
      $scope.listtype = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  $scope.save = function () {
    //表单验证
    if ($scope.validateCheck()) {
      //新增
      $http.post($scope.app.BaseUrl + "/admin/application", $scope.item).success(function (response) {
        modal.alert("添加成功!");
        $state.go("app.application.list");
      }).error(function (data) {
        modal.alert(data.msg);
      })
    }
  }
  //返回
  $scope.goback = function () {
    $state.go("app.application.list");  
  }
}).controller("applicationSaveOther", function ($scope, $http, $state, $stateParams, modal, $modal) {
  //表单验证
  $scope.validate = {
    "name": true,
    "author": true,
    "appversion": true,
    "createTime": true,
    "apptype": true,
    "solgan": true,
    "summary": true,
    "icon": true,
    "appScreens": true,
    "price":true,
    "url":true,
    "useCount":true
  }
  $scope.item = {
    "name": undefined,
    "author": undefined,
    "appversion": undefined,
    "createTime": undefined,
    "apptype": undefined,
    "solgan": undefined,
    "summary": undefined,
    "icon": undefined,
    "appScreens": undefined,
    "url": undefined,
    "price":undefined,
  }
  $scope.validateCheck = function () {
    //应用名不能为空
    if ($scope.item.name == undefined || $scope.item.name == "") {
      $scope.validate.name = false;
    } else {
      $scope.validate.name = true;
    }
    if ($scope.item.author == undefined || $scope.item.author == "") {
      $scope.validate.author = false;
    } else {
      $scope.validate.author = true;
    }
    if ($scope.item.appversion == undefined || $scope.item.appversion == "") {
      $scope.validate.appversion = false;
    } else {
      $scope.validate.appversion = true;
    }
    if ($scope.item.createTime == undefined || $scope.item.createTime == "") {
      $scope.validate.createTime = false;
    } else {
      $scope.validate.createTime = true;
    }
    if ($scope.item.sort == undefined || $scope.item.sort == "") {
      $scope.validate.sort = false;
    } else {
      $scope.validate.sort = true;
    }
    if ($scope.item.apptype == undefined || $scope.item.apptype == "") {
      $scope.validate.apptype = false;
    } else {
      $scope.validate.apptype = true;
    }
    if ($scope.item.url == undefined || $scope.item.url == "") {
      $scope.validate.url = false;
    } else {
      $scope.validate.url = true;
    }
    if ($scope.item.useCount == undefined || $scope.item.useCount == "") {
      $scope.validate.useCount = false;
    } else {
      $scope.validate.useCount = true;
    }
    if ($scope.item.solgan == undefined || $scope.item.solgan == "") {
      $scope.validate.solgan = false;
    } else {
      $scope.validate.solgan = true;
    }
    if ($scope.item.summary == undefined || $scope.item.summary == "") {
      $scope.validate.summary = false;
    } else {
      $scope.validate.summary = true;
    }
    if ($scope.item.icon == undefined || $scope.item.icon == "") {
      $scope.validate.icon = false;
    } else {
      $scope.validate.icon = true;
    }
    if ($scope.item.appScreens == undefined || $scope.item.appScreens == "") {
      $scope.validate.appScreens = false;
    } else {
      $scope.validate.appScreens = true;
    }
    if ($scope.item.price == undefined || $scope.item.price == "") {
      $scope.validate.price = false;
    } else {
      $scope.validate.price = true;
    }
    if ($scope.validate.name &&
      $scope.validate.author &&
      $scope.validate.appversion &&
      $scope.validate.createTime &&
      $scope.validate.apptype &&
      $scope.validate.solgan &&
      $scope.validate.summary &&
      $scope.validate.icon &&
      $scope.validate.appScreens && 
      $scope.validate.url && 
      $scope.validate.price ) {
      return true;
    }
    return false;
  }
  //展开时间
  $scope.openstime = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stimeOpened = true;
  };
  //查询所有的分类
  $scope.findAllType = function () {
    $http.get($scope.app.BaseUrl + "/admin/application/types").success(function (response) {
      $scope.listtype = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  $scope.save = function () {
    //表单验证
    if ($scope.validateCheck()) {
      //新增
      $scope.item.type = 1
      $http.post($scope.app.BaseUrl + "/admin/application", $scope.item).success(function (response) {
        modal.alert("添加成功!");
        $state.go("app.application.list");
      }).error(function (data) {
        modal.alert(data.msg);
      })
    }
  }
  //返回
  $scope.goback = function () {
    $state.go("app.application.list");  
  }
}).controller("applicationEditOther", function ($scope, $http, $state, $stateParams, modal, $modal) {
  // $scope.item;
  //表单验证
  $scope.validate = {
    "name": true,
    "author": true,
    "appversion": true,
    "createTime": true,
    "apptype": true,
    "solgan": true,
    "summary": true,
    "icon": true,
    "appScreens": true,
    "url": true,
    "price":true,
    "useCount":true
  }
  if ($stateParams.id != undefined && $stateParams.id != "") {
    //获取数据
    $http.get($scope.app.BaseUrl + "/admin/application/" + $stateParams.id).success(function (response) {
      $scope.item = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //查询所有的分类
  $scope.findAllType = function () {
    $http.get($scope.app.BaseUrl + "/admin/application/types").success(function (response) {
      $scope.listtype = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //展开时间
  $scope.openstime = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.stimeOpened = true;
  };

  $scope.validateCheck = function () {
    //应用名不能为空
    if ($scope.item.name == undefined || $scope.item.name == "") {
      $scope.validate.name = false;
    } else {
      $scope.validate.name = true;
    }
    if ($scope.item.author == undefined || $scope.item.author == "") {
      $scope.validate.author = false;
    } else {
      $scope.validate.author = true;
    }
    if ($scope.item.appversion == undefined || $scope.item.appversion == "") {
      $scope.validate.appversion = false;
    } else {
      $scope.validate.appversion = true;
    }
    if ($scope.item.createTime == undefined || $scope.item.createTime == "") {
      $scope.validate.createTime = false;
    } else {
      $scope.validate.createTime = true;
    }
    if ($scope.item.sort == undefined || $scope.item.sort == "") {
      $scope.validate.sort = false;
    } else {
      $scope.validate.sort = true;
    }
    if ($scope.item.apptype == undefined || $scope.item.apptype == "") {
      $scope.validate.apptype = false;
    } else {
      $scope.validate.apptype = true;
    }
    if ($scope.item.url == undefined || $scope.item.url == "") {
      $scope.validate.url = false;
    } else {
      $scope.validate.url = true;
    }
    if ($scope.item.useCount == undefined || $scope.item.useCount == "") {
      $scope.validate.useCount = false;
    } else {
      $scope.validate.useCount = true;
    }
    if ($scope.item.solgan == undefined || $scope.item.solgan == "") {
      $scope.validate.solgan = false;
    } else {
      $scope.validate.solgan = true;
    }
    if ($scope.item.summary == undefined || $scope.item.summary == "") {
      $scope.validate.summary = false;
    } else {
      $scope.validate.summary = true;
    }
    if ($scope.item.icon == undefined || $scope.item.icon == "") {
      $scope.validate.icon = false;
    } else {
      $scope.validate.icon = true;
    }
    if ($scope.item.appScreens == undefined || $scope.item.appScreens == "") {
      $scope.validate.appScreens = false;
    } else {
      $scope.validate.appScreens = true;
    }
    if ($scope.item.price == undefined || $scope.item.price == "") {
      $scope.validate.price = false;
    } else {
      $scope.validate.price = true;
    }
    
    if ($scope.validate.name &&
      $scope.validate.author &&
      $scope.validate.appversion &&
      $scope.validate.createTime &&
      $scope.validate.apptype &&
      $scope.validate.solgan &&
      $scope.validate.summary &&
      $scope.validate.icon &&
      $scope.validate.appScreens &&
      $scope.validate.url &&
      $scope.validate.price ) {
      return true;
    }
    return false;
  }


  //点击提交
  //表单验证
  $scope.save = function () {
    if ($scope.validateCheck()) {
      if ($stateParams.id != undefined && $stateParams.id != "") {
        //修改
        $http.put($scope.app.BaseUrl + "/admin/application", $scope.item).success(function (response) {
          modal.alert("修改成功!");
          $state.go("app.application.list");
        }).error(function (data) {
          modal.alert(data.msg);
        })
      }
    }else{
      console.log($scope.item);
    }

  }

})