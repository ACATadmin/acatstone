app.controller("registerCtl", function ($scope, $http, $state, modal, $modal) {
        //用户注册

        $scope.item = {
            "email": "",
            "password": "",
            'repassword': ''
        };

        $scope.Errorstate = {
            'erroremail': false,
            'difference': false,
            'Wrongpassword': false,
        };

        $scope.regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        $scope.regemail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        /*注册邮箱验证*/
        $scope.emailInput = function () {
            if ($scope.regemail.test($scope.item.email)) {

                return $scope.Errorstate.erroremail = false;
            } else {

                return $scope.Errorstate.erroremail = true;
            }
        }
        /*注册密码验证*/
        $scope.passwordInput = function () {
            if ($scope.regpassword.test($scope.item.password)) {

                return $scope.Errorstate.Wrongpassword = false;

            } else {

                return $scope.Errorstate.Wrongpassword = true;
            }
        };
        /*判断密码和确认密码*/
        $scope.fouseInput = function () {
            if ($scope.item.password == $scope.item.repassword) {

                return $scope.Errorstate.difference = false;

            } else {

                return $scope.Errorstate.difference = true

            }
        };

        $scope.checkFromVal = function () {
            /*判断输入框不为空*/
            if ($scope.item.email == "" || $scope.item.password == "" || $scope.item.repassword == '') {
                return true;
            }
            /*判断都输入内容都正确*/
            else if ($scope.Errorstate.erroremail || $scope.Errorstate.Wrongpassword || $scope.Errorstate.difference) {
                return true;
            } else {
                return false;
            }
        };

        $scope.save = function () {
            //请求数据
            $http.post($scope.app.BaseUrl + "/api/user", $scope.item).success(function (response) {
                //  layer.msg("注册成功!");
                $state.go("app.login");
            }).error(function (data) {
                layer.msg(data.msg, {
                    offset: ['90%', '33%']
                });

            })

        }
    }).controller("loginCtl", function ($scope, $http, $state, $stateParams, modal, $modal, $rootScope) {
        //判断是否登录-如果登录了，就跳转已登录页
        // $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
        //     $state.go("app.haslogin");
        // })


        $scope.item = {
            "email": "",
            "password": ""
        };
        $scope.checkFromVal = function () {
            if ($scope.item.email == "" || $scope.item.password == "") {
                return true;
            }
            return false;
        };
        //登录
        $scope.login = function () {
            $http.post($scope.app.BaseUrl + "/api/user/login", $scope.item).success(function (data, status, headers, config) {
                if (data.data.sucflag) {
                    sessionStorage.setItem("ishaveLogin", true); //是否登录标记
                    // console.log("x-auth-token=========>>>>"+headers("x-auth-token"));
                    $scope.app.userT = data.data.userT;
                    layer.msg("Login Success!", {
                        offset: ['90%', '33%']
                    });
                    // layer.msg(data.msg, {
                    //     offset: ['90%', '33%']
                    // });
                    //发送给父级$rootScope获取用户信息接口
                    // 广播事件
                    $rootScope.$broadcast('siginSuccess', true);
                    // $state.go("app.home");
                    //跳转页面
                    // console.log($stateParams.reurl);
                    var absurl = $stateParams.reurl;
                    if (absurl != undefined && absurl != "") {
                        location.href = absurl;
                    } else {
                        $state.go("app.home");
                    }
                    // $state.reload();                    
                } else {
                    if (data.data.state == 2) {
                        //Username or Password is wrong!
                        $scope.errormsg = "Username or Password is wrong!";
                    } else if (data.data.state == 3) {
                        //Parameter error!
                        $scope.errormsg = "Parameter error!";
                    } else if (data.data.state == 4) {
                        //Parameter error!
                        $scope.errormsg = "User account is disabled!";
                    }
                }
            }).error(function (data) {
                layer.msg(data.msg);
            })
        }

    }).controller("hasloginCtl", function ($scope, $http, $state, $stateParams, modal, $modal, $rootScope) {
        $http.get($scope.app.BaseUrl + "/api/user/islogin").success(function (response) {
            $scope.employeeT = response.data;
        })
        $scope.logout = function () {
            $http.get($scope.app.BaseUrl + "/api/user/logout").success(function (response) {
                sessionStorage.removeItem("X-Auth-Token-H5");
                layer.msg("Logout success", {
                    offset: ['90%', '33%']
                });
                $state.go("app.login");
            })
        }
    }).controller("forgotpassword", function ($scope, $http, $state, modal, $stateParams, $modal) {

        $scope.item = {
            "email": "",
            "code": "",
            "password": "",
            "repassword": ""
        }
        $scope.item.code = $stateParams.code;
        $scope.subEmail = function () {
            var emailboolean = false;
            //判断email是否为空
            if ($scope.item.email == undefined || $scope.item.email == "") {
                emailboolean = true;
            } else {
                emailboolean = false;
            }
            if (emailboolean) {
                return true; //不能点击
            }
            return false;

        };

        $scope.subVerify = function () {
            var codeboolean = false;
            //判断code是否为空
            if ($scope.item.code == undefined || $scope.item.code == "") {
                codeboolean = true;
            } else {
                codeboolean = false;
            }
            if (codeboolean) {
                return true; //不能点击
            }
            return false;

        };

        $scope.subReset = function () {
            $scope.regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            var repasswordboolean = false;
            var passwordboolean = false;


            //判断password是否为空
            if ($scope.item.password == undefined || $scope.item.password == "") {
                passwordboolean = true;
                $scope.errorEmailmsg = "• Password must have at least one alphanumeric character"
            } else {
                passwordboolean = false;
            }
            //判断repassword是否为空
            if ($scope.item.repassword == undefined || $scope.item.repassword == "") {
                repasswordboolean = true;
            } else {
                repasswordboolean = false;
            }
            //两个密码是否一样
            if ($scope.item.repassword != $scope.item.password) {
                repasswordboolean = true;
                passwordboolean = true;
                $scope.errorEmailmsg = "• The password and confirmation password must be the same"
            } else {
                repasswordboolean = false;
                passwordboolean = false;
            }

            if ($scope.regpassword.test($scope.item.password)) {
                passwordboolean = false
            } else {
                passwordboolean = true
                $scope.errorEmailmsg = "• Passwords must hava at least one uppercase('A'-'Z')"
            }
            if (repasswordboolean || passwordboolean) {
                return true; //不能点击
            }
            return false;

        };

        /* 提交邮箱*/
        $scope.sub = function () {
            $http.post($scope.app.BaseUrl + "/api/mail/passwordemail", $scope.item).success(function (response) {
                layer.msg("Email Send Success!", {
                    offset: ['90%', '33%']
                });
                $state.go("app.forgot_password_2");
            }).error(function (data) {
                $scope.errorEmailmsg = data.msg
            })
        }

        /* 提交验证码 */
        $scope.verify = function () {
            $scope.item.email = $stateParams.email
            $http.post($scope.app.BaseUrl + "/api/user/fotgetverify", $scope.item).success(function (response) {
                $state.go("app.forgot_password_3", {
                    "code": $scope.item.code
                });
            }).error(function (data) {
                $scope.errorEmailmsg = data.msg
            })
        }

        /* 重置密码 */
        $scope.reset = function () {
            $http.put($scope.app.BaseUrl + "/api/user/resetpassword", $scope.item).success(function (response) {
                layer.msg("Password Reset Success!", {
                    offset: ['90%', '33%']
                });
                $state.go("app.home");
            }).error(function (data) {
                $scope.errorEmailmsg = data.msg
            })
        }
    })
    .controller("modifypassword", function ($scope, $http, $state, modal, $modal) {

        $scope.item = {

            "password": "",
            'repassword': ''
        };

        $scope.Errorstate = {

            'difference': false,
            'Wrongpassword': false,
        };

        $scope.regpassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        /*注册密码验证*/
        $scope.passwordInput = function () {
            if ($scope.regpassword.test($scope.item.password)) {

                return $scope.Errorstate.Wrongpassword = false;

            } else {

                return $scope.Errorstate.Wrongpassword = true;
            }
        };
        /*判断密码和确认密码*/
        $scope.fouseInput = function () {
            if ($scope.item.password == $scope.item.repassword) {

                return $scope.Errorstate.difference = false;

            } else {

                return $scope.Errorstate.difference = true

            }
        };
        $scope.checkFromVal = function () {
            /*判断输入框不为空*/
            if ($scope.item.password == "" || $scope.item.repassword == '') {
                return true;
            }
            /*判断都输入内容都正确*/
            else if ($scope.Errorstate.Wrongpassword || $scope.Errorstate.difference) {
                return true;
            } else {
                return false;
            }
        };
        /*提交修改密码*/
        $scope.save = function () {
            //请求数据
            $http.post($scope.app.BaseUrl + "/api/user", $scope.item).success(function (response) {
                //  layer.msg("注册成功!");
                $state.go("app.login");
            }).error(function (data) {
                layer.msg(data.msg, {
                    offset: ['90%', '33%']
                });

            })

        }
    });