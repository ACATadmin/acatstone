/**
 * Created by kammi on 2018/11/3.
 */
app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.riskManagement', {
        url: '/riskManagement',
        templateUrl: '/views/risk_management/risk_management.html'
    }).state('app.riskMDetail', {
        url: '/riskMDetail',
        templateUrl: '/views/risk_management/riskm_detail.html'
    }).state('app.riskMSelect', {
        url: '/riskMSelect/:appid',
        templateUrl: '/views/risk_management/riskm_select.html',
        controller:"riskmCtrl"
    }).state('app.riskMCompare', {
        url: '/riskMCompare/:appid,:coinfirst,:coinsecond',
        templateUrl: '/views/risk_management/riskm_compare.html',
        controller:"riskCharts"
    })
})