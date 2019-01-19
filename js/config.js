app.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
} ]);
app.config(['AnalyticsProvider', function (AnalyticsProvider) {
    // Add configuration code as desired
    AnalyticsProvider.setAccount('UA-126656081-1');
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

 }]).run(['Analytics', function(Analytics) { }]);
