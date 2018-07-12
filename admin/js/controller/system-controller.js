/*
 * @Author: glory.huis 
 * @Date: 2018-06-06 23:09:41 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-06-27 16:01:41
 */
//管理员列表
app.controller("sysEmployees", function ($scope, $http, $state, modal, $modal) {
  $scope.search = {
    "name": "",
    "email": ""
  };
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/system/employee?page=" + page + "&name=" + $scope.search.name + "&email=" + $scope.search.email).success(function (response) {
      $scope.items = response.data.content;
      $scope.number = response.data.number + 1;
      $scope.totalPages = response.data.totalPages;
      $scope.totalElements = response.data.totalElements;
      $scope.size = response.data.size;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }

  //角色授权
  $scope.employeeRole = function (item) {
    $state.go("app.system.set", {
      "id": item.id
    });
  }
  //用户编辑
  $scope.employeeUpdate = function (item) {
    $state.go("app.system.edit", {
      "id": item.id
    });
  }

  //启用用户
  $scope.enable = function (item) {
    modal.dialog("您确定要启用此用户吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/system/employee/enable/" + item.id).success(function (response) {
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
      $http.get($scope.app.BaseUrl + "/admin/system/employee/disable/" + item.id).success(function (response) {
        modal.alert("禁用成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.error);
      })
    })
  }
  //刷新-重置搜索框
  $scope.reflushAll = function () {
    $scope.search.name = "";
    $scope.search.email = "";
    $scope.selectPage(0);
  }




}).controller("sysEmployeeAdd", function ($scope, $http, $state, modal, $modal) {
  //表单验证  
  $scope.item = {
    "loginName": "",
    "realname": "",
    "email": "",
    "roleid": "",
    "password": "",
    "repassword": ""
  }
  $scope.validate = {
    "loginName": false,
    "realname": false,
    "email": false,
    "roleid": false,
    "password": false,
    "repassword": false
  }
  $scope.formvalidation = function () {
    let a = true;
    let b = true;
    let c = true;
    let d = true;
    let e = true;
    let f = true;
    let g = true;
    if ($scope.item.loginName == undefined || $scope.item.loginName == "") {
      a = true;
      $scope.validate.loginName = true;
    } else {
      a = false;
      $scope.validate.loginName = false;
    }

    if ($scope.item.realname == undefined || $scope.item.realname == "") {
      b = true;
      $scope.validate.realname = true;
    } else {
      b = false;
      $scope.validate.realname = false;
    }

    if ($scope.item.roleid == undefined || $scope.item.roleid == "") {
      c = true;
      $scope.validate.roleid = true;
    } else {
      c = false;
      $scope.validate.roleid = false;
    }
    
    if ($scope.item.email == undefined || $scope.item.email == "") {
      d = true;
      $scope.validate.email = true;
    } else {
      d = false;
      $scope.validate.email = false;
    }
    
    if ($scope.item.password == undefined || $scope.item.password == "") {
      e = true;
      $scope.validate.password = true;
    } else {
      e = false;
      $scope.validate.password = false;

    }
    if ($scope.item.repassword == undefined || $scope.item.repassword == "") {
      f = true;
      $scope.validate.repassword = true;
    } else {
      f = false;
      $scope.validate.repassword = false;
    }

    if ($scope.item.password != $scope.item.repassword) {
      g = true;
      $scope.validate.repassword2 = true;

    } else {
      g = false;
      $scope.validate.repassword2 = false;

    }
    if (!a && !b && !c && !d && !e && !f && !g) {
      //返回可以
      return false;
    }
    return true;
  }

  // 添加管理员
  $scope.findAllRole = function () {
    $http.get($scope.app.BaseUrl + "/admin/system/allrole").success(function (response) {
      $scope.listAllRole = response.data;
    }).error(function (data) {
      modal.alert(data.msg);
    });
  }


  //保存管理员
  $scope.save = function () {
    if(!$scope.formvalidation()){
      $http.post($scope.app.BaseUrl + "/admin/system/employee", $scope.item).success(function (response) {
        modal.alert("添加成功!");
        $state.go("app.system.list");
      }).error(function (data) {
        modal.alert(data.msg);
      })
    }
  }


  //返回
  $scope.goback = function () {
    $state.go("app.system.list");
  }
}).controller("sysEmployeeEdit", function ($scope, $http, $stateParams, $state, modal, $modal) {
  //查询
  $http.get($scope.app.BaseUrl + "/admin/system/employee/" + $stateParams.id).success(function (response) {
    $scope.item = response.data;
  }).error(function (data) {
    modal.alert(data.msg);
  })
  $scope.save = function () {
    $http.put($scope.app.BaseUrl + "/admin/system/employee/", $scope.item).success(function (response) {
      modal.alert("修改成功!");
      $state.go("app.system.list");
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //返回
  $scope.goback = function () {
    $state.go("app.system.list");
  }
}).controller("sysEmployeeSet", function ($scope, $http, $state, $stateParams, modal, $modal) {
  $scope.employeeArray = new Array();
  //查询所有角色
  $http.get($scope.app.BaseUrl + "/admin/system/allrole").success(function (response) {
    $scope.items = response.data;
    //加载用户的权限
    $scope.findEmployeeAuth();
  }).error(function (data) {
    modal.alert(data.msg);
  })
  //查询用户的
  $scope.findEmployeeAuth = function () {
    $http.get($scope.app.BaseUrl + "/admin/system/employee/" + $stateParams.id + "/role").success(function (response) {
      //处理返回的集合
      if (response.data.length > 0) {
        $scope.employeeArray = new Array();
        for (var i = 0; i < response.data.length; i++) {
          $scope.employeeArray.push(response.data[i].roleId);
          $("tbody").find(":checkbox").each(function () {
            if (this.value == response.data[i].roleId) {
              this.checked = true;
            }
          });
        }
      }
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }

  // 选中方法
  $scope.addEmpRole = function (id) {
    $("tbody").find(":checkbox").each(function () {
      if (this.value == id) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    });
    $("tbody").find(":checkbox").each(function () {
      if (this.checked) {
        $scope.employeeArray = new Array(id)
        console.log($scope.employeeArray);
      }
    });
    // $scope.addOrDelArray(id);
    // console.log($scope.employeeArray);
  };

  //修改权限
  $scope.save = function () {
    $http.put($scope.app.BaseUrl + "/admin/system/employee/role/" + $stateParams.id, $scope.employeeArray).success(function (response) {
      modal.alert("修改成功!");
      $state.reload();
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //返回
  $scope.goback = function () {
    $state.go("app.system.role");
  }
})