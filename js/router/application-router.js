/*
 * @Author: glory.huis 
 * @Date: 2018-05-29 13:12:57 
 * @Last Modified by: glory.huis
 * @Last Modified time: 2018-07-25 15:20:48
 */

app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.text_list', {
            url: '/text_list/:type',
            controller:"applications",
            templateUrl: 'views/text_list/text_list.html'
        }).state('app.forecast_details', {
            url: '/forecast_details/:appid,:type',
            controller:"application",
            templateUrl: 'views/forecast/forecast_details.html'
        })
})