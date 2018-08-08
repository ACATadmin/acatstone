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
                alphacatVersion:'© 2018 ACAT Store Alpha V1.5.2',
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
                    themeID: 2,
                    navbarHeaderColor: 'bg-white-only',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-white-only',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                },
                realname: "",
                permissions: {},
                BaseUrl:"https://acatstore-api.alphacat.io"
                // BaseUrl:"http://120.55.171.133:28082"
                // BaseUrl:"http://127.0.0.1:8080"

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

        }]);



