//路由
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "app/home");
    // $urlRouterProvider.otherwise('/app/home');
    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: "app.html"
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'views/home/home.html',
            resolve: {
                deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/fullPage/jquery.fullPage.min.js']);
                    }
                ]
            }
        })
        .state('app.to_predict', {
            url: '/to_predict/:appid',
            controller:"echarts",
            templateUrl: 'views/to_predict/to_predict.html',
            resolve: {
                deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/echarts4.1/echarts.min.js']);
                    }]
            }
        })
});
