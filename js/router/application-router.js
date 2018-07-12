/*
 * @Author: glory.huis 
 * @Date: 2018-05-29 13:12:57 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-03 22:21:46
 */

app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.text_list', {
            url: '/text_list/:type',
            controller:"applications",
            templateUrl: 'views/text_list/text_list.html'
        }).state('app.forecast_details', {
            url: '/forecast_details/:id,:type',
            controller:"application",
            templateUrl: 'views/forecast/forecast_details.html'
        })
})