var app = angular.module('app', [
    'ui.router', 'app-directive', 'ui.bootstrap', "app-modal", 'ui.load', 'ui.select', 'ngSanitize', 'ngStorage', 'angularFileUpload', "ng.ueditor",
    'ngCookies'
])

app.factory('httpInterceptor', function ($q, $injector) {
    return {
        // 可选，拦截成功的请求
        request: function (config) {
            // 进行预处理
            //设置handers
            config.headers = config.headers || {};
            config.headers["X-Auth-Token"] = sessionStorage.getItem("X-Auth-Token");
            // ...
            return config || $q.when(config);
        },

        // 可选，拦截失败的请求
        requestError: function (rejection) {
            // 对失败的请求进行处理
            // ...
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        },



        // 可选，拦截成功的响应
        response: function (response) {
            // 进行预处理
            // console.log(response.headers("x-auth-token"));
            // response.headers("x-auth-token")
            if (response.headers("x-auth-token") != null) {
                sessionStorage.setItem("X-Auth-Token", response.headers("x-auth-token"));
            }
            // ....
            return response || $q.when(reponse);
        },

        // 可选，拦截失败的响应
        responseError: function (response) {
            // 对失败的响应进行处理var
            var state = $injector.get('$state');
            var modal = $injector.get('modal');
            var statename = state.current.name
            if (response.status == 401 && statename != "signin") {
                state.go("signin");
                // return $q.defer(response)
            } else if (response.status == 403 && statename != "signin") {
                modal.alert("权限不足，您无法进行此项操作，请联系管理员。")
                // return $q.defer(response)
            } else {
                return $q.reject(response);
            }
        }
    };
});
app.filter('moneyFormat', function () {
    return function (n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元');
    }
});
app.filter('jsonFormat', function () {
    return function (value) {
        return angular.fromJson(value);
    }
});

// app.run(function ($rootScope, $transitions, $state) {
//     $transitions.onStart({}, function (trans) {
//         if (!sessionStorage.getItem('X-Auth-Token')) {
//             return trans.router.stateService.target('access.signin');
//         }
//     })
// });


// app.run(['$rootScope', '$state', function ($rootScope, $state) {
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//         //判断sessionid
//         if(sessionStorage.getItem("X-Auth-Token")!=undefined && sessionStorage.getItem("X-Auth-Token")!=""){
//             $state.go("access.signin");
//         }
//         return;        
//     });
// }]);