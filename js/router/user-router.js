app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.login', {
        url: '/login/:reurl',
        controller:'loginCtl',        
        templateUrl: '/views/login/login.html'
    }).state('app.register', {
        url: '/register',
        controller:'registerCtl',
        templateUrl: '/views/register/register.html'
    }).state('app.forgot_password', {
        url: '/forgot_password',
        controller:'forgotpassword',
        templateUrl: '/views/forgot_password/forgot_password_1.html'
    }).state('app.forgot_password_2', {
        url: '/forgot_password_2/:email',
        controller:'forgotpassword',
        templateUrl: '/views/forgot_password/forgot_password_2.html'
    }).state('app.forgot_password_3', {
        url: '/forgot_password_3/:code',
        controller:'forgotpassword',
        templateUrl: '/views/forgot_password/forgot_password_3.html'
    }).state('app.modify_password', {
        url: '/modify_password',
        controller:'modifypassword',
        templateUrl: '/views/forgot_password/modify_password.html'
    }).state('app.haslogin', {
        url: '/haslogin',
        controller:'hasloginCtl',
        templateUrl: '/views/login/haslogin.html'
    })
})