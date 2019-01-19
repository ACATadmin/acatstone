//路由
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "app/home/journal");
    // $urlRouterProvider.otherwise('/app/home');
    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: "../admin/app.html"
        })
        .state('app.home', {
            url: '/home',
            templateUrl: '../admin/views/home/home.html'
        })
        .state('app.home.home_content', {
            url: '/home_content',
            templateUrl: '../admin/views/home/home_content.html',
            resolve: {
                deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/echarts/echarts.js']);
                    }]
            }
        })
        .state('app.home.information', {
            url: "/information",
            templateUrl: "../admin/views/home/information.html"
        })


        .state('app.content', {
            url: "/content",
            templateUrl: "../admin/views/content/content.html"
        })
        .state('app.content.text', {
            url: "/text",
            controller:"articles",
            templateUrl: "/admin/views/content/content_text.html"
        })
        .state('app.content.text_edit_add', {
            url: "/text_edit_add/:id",
            controller:"articleEdit",
            templateUrl: "../admin/views/content/text_edit_add.html"
        })
        .state('app.content.text_check', {
            url: "/text_check",
            templateUrl: "../admin/views/content/text_check.html"
        })
        .state('access', {
            url: '/access',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        })
        .state('access.signin', {
            url: '/signin',
            templateUrl: '../admin/views/page_signin/page_signin.html',
        })

});
