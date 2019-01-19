/**
 * Created by kammi on 2018/11/3.
 */
app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.indices', {
        url: '/indices',
        templateUrl: '/views/indices/indices.html',
        controller:"indices"
    }).state('app.indicesDetail', {
        url: '/indicesDetail',
        templateUrl: '/views/indices/indices_detail.html'
    }).state('app.indicesIndex', {
        url: '/indicesIndex/:appid,:type',
        templateUrl: '/views/indices/indices_index.html',
        controller:'indiceE'
    })
})