/*
 * @Author: glory.huis 
 * @Date: 2018-05-21 15:56:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-12 23:10:02
 */

app.config(function($urlRouterProvider,$stateProvider){
    $stateProvider.state('app.content.banner', {
        url: "/banner",
        controller:"banners",
        templateUrl: "/admin/views/content/content_banner.html"
    }).state('app.content.banner_edit_add', {
        url: "/banner_edit_add",
        controller:"bannerEditCtrl",
        templateUrl: "/admin/views/content/banner_edit_add.html"
    })
})