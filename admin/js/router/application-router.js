/*
 * @Author: glory.huis 
 * @Date: 2018-05-23 16:57:22 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-05-24 16:14:49
 */

app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.application', {
            url: "/application",
            templateUrl: "/admin/views/application/application.html"
        }).state('app.application.list', {
            url: "/list",
            templateUrl: "/admin/views/application/application_list.html",
            controller:"applications"
        }).state('app.application.edit', {
            url: "/edit/:id",
            templateUrl: "/admin/views/application/application_edit.html",
            controller:"applicationEdit"
        }).state('app.application.save', {
            url: "/save",
            templateUrl: "/admin/views/application/application_save.html",
            controller:"applicationSave"
        })
})