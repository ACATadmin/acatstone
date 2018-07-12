/*
 * @Author: glory.huis 
 * @Date: 2018-05-25 15:42:23 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-05-25 16:28:55
 */
app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.user', {
            url: "/user",
            templateUrl: "/admin/views/user/user.html"
        }).state('app.user.list', {
            url: "/list",
            controller:"users",
            templateUrl: "/admin/views/user/user_list.html"
        }).state('app.user.edit', {
            url: "/edit/:id",
            controller:"user",
            templateUrl: "/admin/views/user/user_edit.html"
        })
})