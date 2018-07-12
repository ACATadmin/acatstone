app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.system', {
            url: "/system",
            templateUrl: "/admin/views/system/system.html"
        })
        .state('app.system.list', {
            url: "/list",
            controller:"sysEmployees",
            templateUrl: "/admin/views/system/system_list.html"
        })
        .state('app.system.add', {
            url: "/add",
            controller:"sysEmployeeAdd",
            templateUrl: "/admin/views/system/system_add.html"
        })
        .state('app.system.edit', {
            url: "/edit/:id",
            controller:"sysEmployeeEdit",
            templateUrl: "/admin/views/system/system_edit.html"
        })
        .state('app.system.set', {
            url: "/set/:id",
            controller:"sysEmployeeSet",
            templateUrl: "/admin/views/system/system_set.html"
        })
        .state('app.system.role', {
            url: "/role",
            controller:"sysRoles",
            templateUrl: "/admin/views/system/system_role.html"
        })
        .state('app.system.warrant', {
            url: "/warrant/:id,:roleName",
            controller:"warrantCtrl",
            templateUrl: "/admin/views/system/system_warrant.html"
        })
        .state('app.system.role_edit', {
            url: "/role_edit/:id",
            controller:"sysRoleEditCtrl",
            templateUrl: "/admin/views/system/system_role_edit.html"
        })
        .state('app.system.role_add', {
            url: "/role_add",
            controller:"sysRoleAddCtrl",            
            templateUrl: "/admin/views/system/system_role_add.html"
        })
})