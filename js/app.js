var app = angular.module('app', [
    'ui.router', 'app-directive', 'ui.bootstrap', 'ui.load', 'app-modal'
])

app.factory('httpInterceptor', function ($q, $injector,$location) {
    return {
        // 可选，拦截成功的请求
        request: function (config) {
            // 进行预处理
            //设置handers
            config.headers = config.headers || {};
            // if(sessionStorage.getItem("X-Auth-Token-H5")!=null){
            //     config.headers["x-auth-token"] = sessionStorage.getItem("X-Auth-Token-H5");
            // }
            config.headers["x-auth-token"] = sessionStorage.getItem("X-Auth-Token-H5");
            console.log("request:"+config.headers["x-auth-token"])
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
            // ....
            if(response.headers("x-auth-token")!=null){
                console.log("response:"+response.headers("x-auth-token"))
                sessionStorage.setItem("X-Auth-Token-H5", response.headers("x-auth-token"));
            }
            // console.log($location.absUrl());
            return response || $q.when(reponse);
        },

        // 可选，拦截失败的响应
        responseError: function (response) {
            // 对失败的响应进行处理var
            var state = $injector.get('$state');
            if (response.status == 401) {
                layer.msg("please log in again!")
                state.go("app.login",{"reurl":$location.absUrl()});
                // return $q.defer(response)
            } else if (response.status == 403) {
                layer.msg("Unauthorized!")
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

app.run(['$rootScope', '$log', function ($rootScope, $log) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $("#headerbtn").removeClass('active');
        $('body').css("overflow", 'auto')
    });
}]);