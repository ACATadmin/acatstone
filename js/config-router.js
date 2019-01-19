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
            url: '/to_predict/:appid,:type',
            controller:"echarts",
            templateUrl: 'views/to_predict/to_predict.html?v=2',
            resolve: {
                deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/echarts4.1/echarts.min.js?v=2']);
                    }]
            }
        })
        .state('app.article1', {
            url: "/article/article1",
            templateUrl: "/views/article/article-1.html"
        })
        .state('app.article2', {
            url: "/article/article2",
            templateUrl: "/views/article/article-2.html"
        })
        .state('app.article3', {
            url: "/article/article3",
            templateUrl: "/views/article/article-3.html"
        })
        .state('app.article4', {
            url: "/article/article4",
            templateUrl: "/views/article/article-4.html"
        })
        .state('app.article5', {
            url: "/article/article5",
            templateUrl: "/views/article/article-5.html"
        })
        .state('app.article6', {
            url: "/article/article6",
            templateUrl: "/views/article/article-6.html"
        })
        .state('app.article7', {
            url: "/article/article7",
            templateUrl: "/views/article/article-7.html"
        })
        .state('app.article8', {
            url: "/article/article8",
            templateUrl: "/views/article/article-8.html"
        })
        .state('app.article9', {
            url: "/article/article9",
            templateUrl: "/views/article/article-9.html"
        })
        .state('app.article10', {
            url: "/article/article10",
            templateUrl: "/views/article/article-10.html"
        })
        .state('app.article11', {
            url: "/article/article11",
            templateUrl: "/views/article/article-11.html"
        })
        .state('app.media', {
            url: "/media/media",
            controller:"media",
            templateUrl: "/views/media/media.html"
        })
        .state('app.detail', {
            url: "/media/detail/:id",
            controller:"mediaDetail",
            templateUrl: "/views/media/media_detail.html"
        })
        .state('app.markets', {
            url: "/article/markets",
            controller:"markets",
            templateUrl: "/views/article/markets.html"
        })
        .state('app.lacktime', {
            url: "/lacktime/lacktime/:appid,:type",
            controller:"lacktimeController",
            templateUrl: "/views/lacktime/lacktime.html?v=2"
        })
        .state('app.cost', {
            url: "/cost/cost",
            controller:"cost",
            templateUrl: "/views/cost/cost_list.html"
        })
        .state('app.recharge', {
            url: "/cost/recharge",
            controller:"recharge",
            templateUrl: "/views/cost/recharge_list.html"
        })
})