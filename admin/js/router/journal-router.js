app.config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('app.home.journal', {
        url: "/journal",
        templateUrl: "/admin/views/home/journal.html",
        controller: "journals"
    })
})