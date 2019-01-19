/*
 * @Author: glory.huis 
 * @Date: 2018-06-08 12:21:42 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-06-27 16:14:23
 */
//角色
app.controller("sysRoles", function ($scope, $http, $state, modal, $modal) {
  $scope.searchname = "";
  $scope.selectPage = function (page) {
    $http.get($scope.app.BaseUrl + "/admin/system/role?page=" + page+"&name="+$scope.searchname).success(function (response) {
      $scope.items = response.data.content;
      $scope.number = response.data.number + 1;
      $scope.totalPages = response.data.totalPages;
      $scope.totalElements = response.data.totalElements;
      $scope.size = response.data.size;
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //启用用户
  $scope.enable = function (item) {
    modal.dialog("您确定要启用此角色吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/system/role/enable/" + item.id).success(function (response) {
        modal.alert("启用成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.error);
      })
    })
  }
  //禁用用户
  $scope.disable = function (item) {
    modal.dialog("您确定要禁用此角色吗？", function () {
      $http.get($scope.app.BaseUrl + "/admin/system/role/disable/" + item.id).success(function (response) {
        modal.alert("禁用成功!");
        $state.reload();
      }).error(function (data) {
        modal.alert(data.error);
      })
    })
  }
  //编辑权限
  $scope.systemWarrant = function (item) {
    $state.go("app.system.warrant", {
      "id": item.id,
      "roleName": item.roleName
    });
  }


  //刷新-重置搜索框
  $scope.reflushAll = function () {
    $scope.searchname = "";
    $scope.selectPage(0);
  }
  //编辑角色
  $scope.systemRoleUpdate = function (item) {
    $state.go("app.system.role_edit", {
      "id": item.id
    });
  }
}).controller("sysRoleAddCtrl", function ($scope, $http, $state, modal, $modal) {
  //添加
  $scope.save = function () {
    $http.post($scope.app.BaseUrl + "/admin/system/role", $scope.item).success(function (response) {
      modal.alert("添加成功!");
      $state.go("app.system.role");
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //返回
  $scope.goback = function () {
    $state.go("app.system.role");
  }
}).controller("sysRoleEditCtrl", function ($scope, $http, $stateParams, $state, modal, $modal) {
  //修改角色

  //查询
  $http.get($scope.app.BaseUrl + "/admin/system/role/" + $stateParams.id).success(function (response) {
    $scope.item = response.data;
  }).error(function (data) {
    modal.alert(data.msg);
  })
  $scope.save = function (param) {
    $http.put($scope.app.BaseUrl + "/admin/system/role", $scope.item).success(function (response) {
      modal.alert("修改成功!");
      $state.go("app.system.role");
    }).error(function (data) {
      modal.alert(data.msg);
    })

  }
  //返回
  $scope.goback = function () {
    $state.go("app.system.role");
  }
}).controller("warrantCtrl", function ($scope, $http, $stateParams, $state, modal) {
  //角色授权-编辑
  $scope.roleName = $stateParams.roleName;
  $scope.employeeArray = new Array();
  //查询所有角色
  $http.get($scope.app.BaseUrl + "/admin/system/permissions").success(function (response) {
    $scope.items = response.data;
    //加载用户的权限
    $scope.findEmployeeAuth();
  }).error(function (data) {
    modal.alert(data.msg);
  })
  //查询用户的
  $scope.findEmployeeAuth = function () {
    $http.get($scope.app.BaseUrl + "/admin/system/role/" + $stateParams.id + "/perm").success(function (response) {
      // $scope.employeeArray = response.data;
      //处理返回的集合
      if (response.data.length > 0) {
        $scope.employeeArray = new Array();
        for (var i = 0; i < response.data.length; i++) {
          $scope.employeeArray.push(response.data[i].permId);
          // $("#checkboxdiv").find(":checkbox").each(function () {
          //   if (this.value == response.data[i].permId) {
          //     this.checked = true;
          //   }
          // });
        }
        $scope.renderingCheckbox();
      }
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  // 选中子项的方法
  $scope.addMethodPermission = function (event, id) {
    if (event.target.checked) {
      //选择
      //选中头部的总的(如果已选就不管了)
      $(event.target).parents("div[name='permdiv']").prev().find("input[name='permcategoryid']").each(function () {
        if (this.checked) {
          console.log("已选中");
        } else {
          console.log("未选中");
          console.log(this.value);
          $scope.delOneArray(this.value);
          $scope.addOrDelArray(this.value);
          $scope.renderingCheckbox();
        }
      });
    } else {
      //取消选择
      //判断这一组是不是都没选中了
      var ishavechecked = false;
      $(event.target).parents("tbody").find(":checkbox").each(function () {
        if (this.checked) {
          ishavechecked = true;
        }
      });
      console.log(ishavechecked);
      //如果都没选中了
      if (!ishavechecked) {
        //清除头的id
        $(event.target).parents("div[name='permdiv']").prev().find("input[name='permcategoryid']").each(function () {
          if (this.checked) {
            console.log("已选中");
            $scope.delOneArray(this.value);
            $scope.renderingCheckbox();
          } else {
            console.log("未选中");
          }
        });
      }
    }
    $scope.addOrDelArray(id);
    $scope.renderingCheckbox();
    // console.log($scope.employeeArray);
  };
  //选择总条目
  $scope.selectAllItem = function (event, item) {
    if (event.target.checked) {
      //先清空
      $scope.delOneArray(item.permissionsT.id);
      //删除数组中已存在的数据
      if (item.permissionsTList != null) {
        if (item.permissionsTList.length > 0) {
          for (let i = 0; i < item.permissionsTList.length; i++) {
            if (item.permissionsTList[i].length > 0) {
              for (let j = 0; j < item.permissionsTList[i].length; j++) {
                $scope.delOneArray(item.permissionsTList[i][j].id);
              }
            }
          }
        }
      }

      //然后添加
      $scope.addOrDelArray(item.permissionsT.id);
      if (item.permissionsTList != null) {
        if (item.permissionsTList.length > 0) {
          for (let i = 0; i < item.permissionsTList.length; i++) {
            if (item.permissionsTList[i].length > 0) {
              for (let j = 0; j < item.permissionsTList[i].length; j++) {
                $scope.addOrDelArray(item.permissionsTList[i][j].id);
              }
            }
          }
        }
      }
      // console.log(item);
    } else {
      //取消选择
      //删除这个分类下的所有已存在的id
      $(event.target).parents("div").parents("div").find(":checkbox").each(function () {
        this.checked = false;
      });
      $scope.delOneArray(item.permissionsT.id);
      //删除数组中已存在的数据
      if (item.permissionsTList != null) {
        if (item.permissionsTList.length > 0) {
          for (let i = 0; i < item.permissionsTList.length; i++) {
            if (item.permissionsTList[i].length > 0) {
              for (let j = 0; j < item.permissionsTList[i].length; j++) {
                $scope.delOneArray(item.permissionsTList[i][j].id);
              }
            }
          }
        }
      }
    }
    $scope.renderingCheckbox();
    // console.log($scope.employeeArray);
  }
  //重新渲染选中checkbox
  $scope.renderingCheckbox = function () {
    $("#checkboxdiv").find(":checkbox").each(function () {
      this.checked = false;
    });
    $("#checkboxdiv").find(":checkbox").each(function () {
      if ($scope.employeeArray.length > 0) {
        for (var i = 0; i < $scope.employeeArray.length; i++) {
          if (this.value == $scope.employeeArray[i]) {
            this.checked = true;
          }
        }
      }
    });
    // console.log($scope.employeeArray);
  }
  //操作数组，不存在就添加，存在就删除
  $scope.addOrDelArray = function (id) {
    if ($scope.employeeArray.length > 0) {
      var ishave = true;
      for (let i = 0; i < $scope.employeeArray.length; i++) {
        if ($scope.employeeArray[i] == id) {
          //删除
          $scope.employeeArray.splice(i, 1);
          ishave = false;
          return;
        }
      }
      if (ishave) {
        $scope.employeeArray.push(id);
      }
    } else {
      //直接添加
      $scope.employeeArray.push(id);
    }
  }

  //删除数组中的数据
  $scope.delOneArray = function (id) {
    if ($scope.employeeArray.length > 0) {
      for (let i = 0; i < $scope.employeeArray.length; i++) {
        if ($scope.employeeArray[i] == id) {
          //删除
          $scope.employeeArray.splice(i, 1);
          return;
        }
      }
    }
  }
  //修改权限
  $scope.save = function () {
    $http.put($scope.app.BaseUrl + "/admin/system/role/perm/" + $stateParams.id, $scope.employeeArray).success(function (response) {
      modal.alert("修改成功!");
    }).error(function (data) {
      modal.alert(data.msg);
    })
  }
  //返回
  $scope.goback = function () {
    $state.go("app.system.role");
  }
})