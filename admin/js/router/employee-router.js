app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.system.modify_password', {
        url: "/modify_password",
        controller:"modifypassword",
        templateUrl: "/admin/views/system/modify_password.html"
    })
})