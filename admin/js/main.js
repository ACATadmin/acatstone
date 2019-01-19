'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$window', '$http', '$state',
        function ($scope, $window, $http, $state) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            // isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'alphacat',
                version: '1.0',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 14,
                    navbarHeaderColor: 'bg-dark',
                    navbarCollapseColor: 'bg-dark',
                    asideColor: 'bg-light',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: true,
                    container: false
                },
                realname: "",
                permissions: {},
                BaseUrl:"https://acatstore-api.alphacat.io",
                //  BaseUrl:"http://47.92.79.48:28080",
                // BaseUrl:"http://localhost:8080",
                employeeT:{},
                employeeLogT:{}                
            }

            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                //$localStorage.settings = $scope.app.settings;
            }, true);

            // angular translate
            $scope.lang = {isopen: false};
            $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'};
            //$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function (langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            // function isSmartDevice( $window )
            // {
            //     // Adapted from http://www.detectmobilebrowsers.com
            //     var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            //     // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            //     return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            // }
            //$scope.logout = function(){
            //  $http.get("/employee/logout").success(function(){
            //    $state.go("signin")
            //  }).error(function(){
            //    $state.go("signin")
            //  })
            //}


        }]);
