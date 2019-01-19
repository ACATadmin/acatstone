angular.module('app')
    .directive('uiLoading', ['$rootScope', '$anchorScroll','$state','$http','$location', function ($rootScope, $anchorScroll,$state,$http,$location) {
        return {
            restrict: 'AC',
            template: '<span class="loading-gif"></span>',
            link: function (scope, el, attrs) {
                el.addClass('loading hide');
                scope.$on('$stateChangeStart', function (event,toState) {
                    $anchorScroll();
                    el.removeClass('hide').addClass('active');
                    if(toState.name == "app.to_predict"){
                        $http.get("https://acatstore-api.alphacat.io/api/user/islogin").success(function(){
                        // $http.get("http://47.92.79.48:28080/api/user/islogin").success(function(){
                            // $http.get("http://localhost:8080/api/user/islogin").success(function(){
                            // $state.go("app.to_predict")
                        }).error(function(){
                            event.preventDefault();
                            $state.go("app.login",{
                                "reurl": $location.absUrl()
                            })
                            layer.msg("Please Login", {
                                offset: ['90%', '33%']
                            });
                            el.addClass('hide').removeClass('active');
                        })
                      
                    }
                });
                scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                    event.targetScope.$watch('$viewContentLoaded', function () {
                        el.addClass('hide').removeClass('active');
                    })
                });
            }
        };
    }]);