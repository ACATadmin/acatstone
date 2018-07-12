var directiveModule = angular.module('app-directive', []);

directiveModule.directive('uploadImage', function () {
    return {
        require: 'ngModel',
        scope: {
            uploadFile: '@'
        },
        link: function (scope, elem, attrs, _ngmodel) {
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue != null && typeof(_ngmodel.$viewValue) != "undefined" && _ngmodel.$viewValue != "") {
                    elem.find("img").attr("src", _ngmodel.$viewValue).attr("style", "width:350px;height:150px;");
                }
            };
            elem.change(function () {
                // 创建上传对象

                var file = $("#" + scope.uploadFile).get(0).files[0];
                var name_ext = file.name.split('.').pop();
                var storeAs = GUID() + "." + name_ext;
                console.log(storeAs);
                var formData = new FormData();
                var name = $("input").val();
                formData.append("file", file);
                formData.append("name", storeAs);
                $.ajax({
                    url: '/upload/img',
                    type: 'POST',
                    data: formData,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    beforeSend: function () {
                        console.log("正在进行，请稍候");
                    }, success: function (response) {
                        if (response.sucflag) {
                            _ngmodel.$setViewValue(response.filepath);
                            elem.find("img").attr("src", response.filepath).attr("style", "width:auto;height:auto;max-width:80%;max-height:80%;");
                            // editor.command(null, 'insertHtml', '<img src="'+response.filepath+'"/>')
                        } else {
                            console.log("失败");
                        }
                    }, error: function (response) {
                        console.log("error");
                    }
                });
                console.log(scope.uploadFile);

            });
        }
    }
});
// directiveModule.directive('uploadImage', function () {
//     return {
//         require: 'ngModel',
//         scope: {uploadId: '@'},
//         link: function (scope, elem, attrs, _ngmodel) {
//             var bucketDomain = "http://o71tin5mf.bkt.clouddn.com/"
//             //监控
//             var watch = scope.$watch('uploadId', function (newValue, oldValue, scope) {
//                 var Qiniu = new QiniuJsSDK();
//                 var icon = Qiniu.uploader({
//                     runtimes: 'html5,flash,html4',      // 上传模式,依次退化
//                     browse_button: scope.uploadId,
//                     uptoken_url: "/upload/token",
//                     get_new_uptoken: false,
//                     unique_names: true,
//                     domain: bucketDomain,
//                     auto_start: true,
//                     filters: {
//                         max_file_size: "5mb",//文件大小
//                         prevent_duplicates: false,
//                         // Specify what files to browse for
//                         mime_types: [
//                             {title: "Image files", extensions: "jpg,gif,png,jpeg"}, // 限定jpg,gif,png后缀上传
//                         ]
//                     },
//                     init: {
//                         'BeforeUpload': function (up, files) {
//                             //return checksize(files[0]);
//                         },
//                         'FileUploaded': function (up, file, info) {
//                             var data = $.parseJSON(info);
//                             _ngmodel.$setViewValue(data.key);
//                             elem.find("img").attr("src", bucketDomain + data.key);
//                             scope.$apply();
//                         },
//                         'Error': function (up, file, info) {
//                             alert("图片格式不正确")
//                         }
//                     }
//                 });
//                 watch();
//             });

//             /**
//              * 绑定数据更新时触发
//              */
//             _ngmodel.$render = function () {
//                 if (_ngmodel.$viewValue == null || typeof(_ngmodel.$viewValue) == "undefined" || _ngmodel.$viewValue == "") {
//                     elem.find("img").attr("src", _ngmodel.$viewValue);
//                     return;
//                 } else {
//                     elem.find("img").attr("src", bucketDomain + _ngmodel.$viewValue);
//                 }
//             };
//         }
//     }
// });

directiveModule.directive('uploadExcel', function ($http, modal) {
    return {
        require: 'ngModel',
        scope: false,
        // scope:{
        //   uploadFile:'@'
        // },
        link: function (scope, elem, attrs, _ngmodel) {
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue != null && typeof(_ngmodel.$viewValue) != "undefined" && _ngmodel.$viewValue != "") {
                    elem.find("text").val(_ngmodel.$viewValue);
                }
            };
            elem.change(function () {
                // 创建上传对象
                let file = $("#upload").get(0).files[0];
                let formData = new FormData();
                let name = $("input").val();
                formData.append("file", file);
                formData.append("name", file.name);
                let assessId = scope.assessId;
                // $.ajax({
                //     url : '/upload/excle/'+assessId,
                //     type : 'POST',
                //     data : formData,
                //     transformRequest: angular.identity,
                //     headers: {
                //         "Content-Type": undefined
                //     },
                //     // 告诉jQuery不要去处理发送的数据
                //     processData : false,
                //     // 告诉jQuery不要去设置Content-Type请求头
                //     // contentType : false,
                //     beforeSend:function(){
                //         console.log("正在进行，请稍候");
                //         $(".waiting").show();
                //     },success : function(response) {
                //         if (response.data.sucflag) {
                //             modal.alert("导入成功！");
                //         } else {
                //             modal.alert("导入失败!");
                //             console.log("失败");
                //         }

                //     },error : function(response) {
                //         console.log("error");
                //     },complete:function(){
                //         $(".waiting").hide();                    
                //     }
                // });

                $http.post("/upload/excle/" + assessId, formData, {
                    transformRequest: angular.identity,
                    headers: {"Content-Type": undefined}
                }).success(function (response) {
                    if (response.data.sucflag) {
                        modal.alert("导入成功！");
                    } else {
                        modal.alert("导入失败!");
                        console.log("失败");
                    }
                }).error(function (response) {
                    console.log("error");
                })
                //清空文本域
                angular.forEach(
                    angular.element("input[type='file']"),
                    function (inputElem) {
                        angular.element(inputElem).val(null);
                    }
                );
            })
        }
    }
});
//为用户导入量表
directiveModule.directive('uploadExcelasses', function ($state,$http, modal) {
    return {
        require: 'ngModel',
        scope: false,
        // scope:{
        //   uploadFile:'@'
        // },
        link: function (scope, elem, attrs, _ngmodel) {
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue != null && typeof(_ngmodel.$viewValue) != "undefined" && _ngmodel.$viewValue != "") {
                    elem.find("text").val(_ngmodel.$viewValue);
                }
            };
            elem.change(function () {
                let aid = scope.aid;
                let uid = scope.uid;
                // 创建上传对象
                let file = $("#upload").get(0).files[0];
                let formData = new FormData();
                let name = $("input").val();
                formData.append("file", file);
                formData.append("name", file.name);
                //上传接口
                $http.post("/upload/assexcle/" + uid+"/"+aid, formData, {
                    transformRequest: angular.identity,
                    headers: {"Content-Type": undefined}
                }).success(function (response) {
                    if (response.data.sucflag) {
                        modal.alert("导入成功！");
                        $state.go("home.userassess", {uid:uid});
                    } else {
                        modal.alert("导入失败!");
                        console.log("失败");
                    }
                }).error(function (response) {
                    console.log("error");
                })
                //清空文本域
                angular.forEach(
                    angular.element("input[type='file']"),
                    function (inputElem) {
                        angular.element(inputElem).val(null);
                    }
                );
            })
        }
    }
});


//本地上传
directiveModule.directive('uploadLocalimg', function ($http, modal) {
    return {
        require: 'ngModel',
        scope: false,
        scope:{
          uploadFile:'@'
        },
        link: function (scope, elem, attrs, _ngmodel) {
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue != null && typeof(_ngmodel.$viewValue) != "undefined" && _ngmodel.$viewValue != "") {
                    elem.find("img").attr("src", scope.$parent.app.BaseUrl+_ngmodel.$viewValue).attr("style", "width:350px;height:150px;");
                }
            };
            elem.change(function () {
                // 创建上传对象
                var file = $("#" + scope.uploadFile).get(0).files[0];
                var formData = new FormData();
                var name = $("input").val();
                formData.append("file", file);
                formData.append("name", file.name);
                $http.post(scope.$parent.app.BaseUrl+"/upload/image", formData, {
                    transformRequest: angular.identity,
                    headers: {"Content-Type": undefined}
                }).success(function (response) {
                    if (response.sucflag) {
                        modal.alert("上传成功！");
                        elem.find("text").val(_ngmodel.$viewValue);
                        _ngmodel.$setViewValue(response.filepath);
                        elem.find("img").attr("src", scope.$parent.app.BaseUrl+response.filepath).attr("style", "width:350px;height:150px;");
                    } else {
                        console.log("失败");
                    }
                }).error(function (response) {
                    console.log("error");
                })
            })
        }
    }
});


directiveModule.directive('dateFormat', ['$filter', function ($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
            }

            function parser() {
                return ctrl.$modelValue;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);

        }
    };
}]);

directiveModule.directive('addressSelect', function ($timeout) {
    return {
        scope: {
            province: '=',
            city: '=',
            area: '=',
            filter: '&', //触发器
            hasall: '=' //是否全部
        },
        templateUrl: "/tpl/address.html",
        link: function (scope, elem, attrs, _ngmodel) {

            var isInit = true;
            //省市区地址数据源
            scope.provinceList = angular.copy(provinceList);

            //如果是有全部按钮，则增加hasall监视。
            // 如果hasall为true，则将province，city，area设置为“”。
            //如果hasall 为false，则初始化省市区下拉框。
            if (scope.hasall != null && typeof(scope.hasall) != "undefined") {
                var hasallWatch = scope.$watch('hasall', function (newValue, oldValue, scope) {
                    if (newValue) {
                        scope.province = "";
                        scope.city = "";
                        scope.area = "";
                        if (!isInit) {
                            isInit = false;
                            $timeout(function () {
                                scope.filter();

                            }, 100);
                        }
                    } else {
                        isInit = false;
                        scope.provinceChange(true);
                    }
                });
            } else {
                //为了初始化赋值
                //如果是没有全部按钮，则监视province对象。
                //如果province的newValue不等于oldValue则将初始化省市区下拉框
                //清理监视
                var watch = scope.$watch('province', function (newValue, oldValue, scope) {
                    if (newValue != oldValue) {
                        scope.provinceChange(false);
                        //watch();
                    }
                });
            }

            scope.provinceChange = function (isFilter) {
                //如果不存在省份，则从省级列表中取第一个。
                //如果存在省份，则对cityList进行对应取值。
                var isExist = false;
                for (var i = 0; i < scope.provinceList.length; i++) {
                    if (scope.provinceList[i].name == scope.province) {
                        scope.cityList = scope.provinceList[i].cityList;
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    scope.cityList = scope.provinceList[0].cityList;
                    scope.province = scope.provinceList[0].name;
                }
                scope.cityChange(isFilter);
            }
            scope.cityChange = function (isFilter) {
                //如果不存在市，则从市级列表中取第一个。
                //如果存在市，则对areaList进行对应取值。
                var isExist = false;
                for (var i = 0; i < scope.cityList.length; i++) {
                    if (scope.cityList[i].name == scope.city) {
                        scope.areaList = scope.cityList[i].areaList;
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    scope.areaList = scope.cityList[0].areaList;
                    scope.city = scope.cityList[0].name;
                }


                scope.areaChange(isFilter);
            }
            scope.areaChange = function (isFilter) {
                //如果不存在市，则从区级列表中取第一个。
                var isExist = false;
                for (var i = 0; i < scope.areaList.length; i++) {
                    if (scope.areaList[i] == scope.area) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    scope.area = scope.areaList[0];
                }
                if (isFilter) {
                    $timeout(function () {
                        scope.filter();
                    }, 100);
                }
            }

            //初始化下拉框
            scope.provinceChange(false);

        }
    }
})

directiveModule.directive('neteaseUpload', function () {
    return {
        require: 'ngModel',
        scope: {
            uploadId: '@'
        },
        link: function (scope, elem, attrs, _ngmodel) {
            var DOMAIN = "http://museplus.nos-eastchina1.126.net/"
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue != null && typeof(_ngmodel.$viewValue) != "undefined" && _ngmodel.$viewValue != "") {
                    elem.find("img").attr("src", DOMAIN + _ngmodel.$viewValue);
                }
            };
            var uploader = Uploader();
            elem.change(function () {
                var file = $("#" + scope.uploadId).get(0).files[0];
                uploader.addFile(file, function (curFile) {
                    ext = curFile.fileName.substring(curFile.fileName.lastIndexOf(".") + 1, curFile.fileName.length);
                    console.log('ext:' + ext)
                    console.log(curFile.fileName + ' is added.');
                });
                $.get(
                    "/oss/netease?ext=" + ext,
                    function (data) {
                        console.log('fileName: ' + data.data.fileName)
                        var param = {
                            bucketName: 'museplus',
                            objectName: data.data.fileName,
                            token: data.data.token,
                            trunkSize: 4 * 1024 * 1024,
                        }
                        uploader.upload(param, function (curFile) {
                            _ngmodel.$setViewValue(data.data.fileName);
                            elem.find("img").attr("src", DOMAIN + data.data.fileName);
                        });
                    }
                )
            })
        }
    }
});


//wangEditor富文本编辑器
directiveModule.directive("wangEditor", function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, _ngmodel) {
            var editor = new wangEditor(elem);
            // 普通的自定义菜单
            editor.config.menus = [
                'source',
                '|',
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                'lineheight',
                'indent',
                '|',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                '|',
                'link',
                'unlink',
                'table',
                'emotion',
                '|',
                'img',
                'video',
                'location',
                'insertcode',
                '|',
                'undo',
                'redo',
                'fullscreen'
            ];
            editor.config.customUpload = true;  // 设置自定义上传的开关
            editor.config.dynamicMap = false;
            editor.config.customUploadInit = uploadLocalInit;
            editor.create();
            /**
             * 绑定数据更新时触发
             */
            _ngmodel.$render = function () {
                if (_ngmodel.$viewValue == null || typeof(_ngmodel.$viewValue) == "undefined" || _ngmodel.$viewValue == "") {
                    return;
                } else {
                    editor.$txt.html(_ngmodel.$viewValue);
                }
            };
            //同步数据到ngModel中
            editor.onchange = function () {
                // 编辑区域内容变化时，实时打印出当前内容
                var html = this.$txt.html()
                _ngmodel.$setViewValue(html);
            };
        }
    }
});
function uploadLocalInit() {
    // this 即 editor 对象
    var editor = this;
    // 触发选择文件的按钮的id
    var btnId = editor.customUploadBtnId;
    // 创建上传对象
    $("#" + btnId).change(function () {
        var file = $(this).find('input').get(0).files[0];
        var name_ext = file.name.split('.').pop();
        var storeAs = GUID() + "." + name_ext;
        console.log(storeAs);
        var formData = new FormData();
        var name = $("input").val();
        formData.append("file", file);
        formData.append("name", storeAs);
        $.ajax({
            url: '/upload/img',
            type: 'POST',
            data: formData,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            beforeSend: function () {
                console.log("正在进行，请稍候");
            }, success: function (response) {
                if (response.sucflag) {
                    editor.command(null, 'insertHtml', '<img src="' + response.filepath + '"/>')
                } else {
                    console.log("失败");
                }
            }, error: function (response) {
                console.log("error");
            }
        });
    });
}

function uploadInit() {
    var DOMAIN = "http://museplus.nos-eastchina1.126.net/"
    // this 即 editor 对象
    var editor = this;
    // 触发选择文件的按钮的id
    var btnId = editor.customUploadBtnId;
    // 创建上传对象
    var uploader = Uploader();
    $("#" + btnId).change(function () {
        var file = $(this).find('input').get(0).files[0];
        uploader.addFile(file, function (curFile) {
            ext = curFile.fileName.substring(curFile.fileName.lastIndexOf(".") + 1, curFile.fileName.length);
            console.log('ext:' + ext)
            console.log(curFile.fileName + ' is added.');
        });
        $.get(
            "/oss/netease?ext=" + ext,
            function (data) {
                console.log('fileName: ' + data.data.fileName)
                var param = {
                    bucketName: 'museplus',
                    objectName: data.data.fileName,
                    token: data.data.token,
                    trunkSize: 4 * 1024 * 1024,
                }
                uploader.upload(param, function (curFile) {
                    editor.command(null, 'insertHtml', '<img src="' + DOMAIN + data.data.fileName + '"/>')
                });
            }
        )
    });
};

/**
 * 金额转换
 */
directiveModule.directive("amountConversion", function () {
    return {
        restrict: "EA",
        require: 'ngModel',
        scope: false,
        link: function (scope, elements) {
            scope.$watch('item.money', function (newValue, oldValue) {
                if (newValue == undefined) {
                    newValue = 0;
                }
                scope.money = numToChinese(newValue);

            });
        }
    }
});

/**
 * 将阿拉伯数字金额转换成中文金额大写
 */
function numToChinese(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
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
/**
 * 生成UUID的方法
 **/
function GUID() {
    return s4() + s4() + '' + s4() + '' + s4() + '' + s4() + '' + s4() + s4() + s4();
};
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};
