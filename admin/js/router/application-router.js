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
        }).state('app.application.priceTemplet', {
            url: "/priceTemplet",
            templateUrl: "/admin/views/application/price_templet.html",
        controller:"pricetemplet"
        })
        .state('app.application.priceTempletAdd', {
            url: "/priceTempletAdd/:id",
            templateUrl: "/admin/views/application/price_templet_add.html",
            controller:"pricetempletEdit"

        }).state('app.application.saveother', {
            url: "/saveother/:id",
            templateUrl: "/admin/views/application/application_save_other.html",
            controller:"applicationSaveOther"
        }).state('app.application.editother', {
            url: "/editother/:id",
            templateUrl: "/admin/views/application/application_edit_other.html",
            controller:"applicationEditOther"
        }).state('app.application.indexConfig', {
            url: "/indexconfig",
            templateUrl: "/admin/views/application/application_index_config.html",
            controller:"indices-config"
        })
})