app.controller('echarts', function ($scope, $http, $state, $stateParams, $location, modal, $modal) {
    // 基于准备好的dom，初始化echarts实例
    var data1;
    var data2;
    var dataTop;
    var dataMedium;
    var dataBottom;
    var dateList;
    var valueList;
    $scope.forecastname = "Forecast";
    $scope.isgtzero = {};
    $scope.mediumLineColor = "#02dc1a";
    $scope.textColotr = {};


    function changeTwoDecimal_f(x) {　　
        var f_x = parseFloat(x);　　
        if (isNaN(f_x))　　 {　　　　
            return 0;　　
        }　　
        var f_x = Math.round(x * 100) / 100;　　
        var s_x = f_x.toString();　　
        var pos_decimal = s_x.indexOf('.');　　
        if (pos_decimal < 0)　　 {　　　　
            pos_decimal = s_x.length;　　
            s_x += '.';　　
        }　　
        while (s_x.length <= pos_decimal + 2)　　 {　　　　
            s_x += '0';　　
        }　　
        return s_x;
    }


    var predict = echarts.init(document.getElementById('predict'));
    //option
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
                gte: 0,
                lt: 49,
                color: '#56B8D3'
            }, {
                gte: 49,
                color: '#00DC19'
            }]
        },
        xAxis: {
            data: ["12:15", "12:16", "12:17", "12:18", "12:19", "12:20", "12:21", "12:22", "12:23", "12:24", "12:25", "12:26", "12:27", "12:28", "12:29", "12:30", "12:31", "12:32", "12:33", "12:34", "12:35", "12:36", "12:37", "12:38", "12:39", "12:40", "12:42", "12:43", "12:44", "12:45", "12:46", "12:47", "12:48", "12:49", "12:50", "12:51", "12:52", "12:53", "12:54", "12:55", "12:56", "12:57", "12:58", "12:59", "13:00", "13:01", "13:02", "13:03"]
        },
        yAxis: {
            splitLine: {
                show: true
            },
            offset: 0,
            min: function (value) {
                return parseInt(value.min - 100);
            },
        },
        series: [{
                type: 'line',
                showSymbol: false,
                data: [6198.15, 6198.15, 6198.15, 6200.68, 6200.68, 6204.37, 6204.37, 6204.37, 6203.5, 6203.5, 6203.5, 6204.71, 6204.71, 6204.3, 6204.3, 6204.3, 6202.93, 6202.93, 6207.77, 6207.77, 6207.77, 6206.18, 6206.18, 6207.38, 6207.38, 6207.38, 6203.31, 6203.31, 6209.4, 6209.4, 6209.4, 6205.36, 6205.36, 6202.38, 6202.38, 6202.38, 6200.49, 6200.49, 6201.83, 6201.83, 6201.83, 6199.94, 6199.94, 6202.04, 6202.04, 6202.04, 6197.33, 6197.33, 6196.33]
            },
            {
                type: 'line',
                showSymbol: false,
                data: []
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    predict.setOption(option);
    window.onresize = function () {
        predict.resize();
    };
    predict.showLoading();

    //预测方法
    $scope.forecast = function (tag) {
        if (tag) {
            $("#flushforecast").attr("disabled", true);
            $scope.forecastname = "Loading...";
            predict.showLoading();
        }
        $http.get($scope.app.BaseUrl + "/api/application/" + $stateParams.appid + "/forecast").success(function (response) {
            $scope.appname = response.data.appname;
            $scope.averagechange = changeTwoDecimal_f(response.data.forecastVo.avgChange * 100);
            if ($scope.averagechange < 0) {
                $scope.isgtzero = {
                    "border": ".07rem solid #FF5722"
                };
                $scope.mediumLineColor = "#FF5722";
                $scope.textColotr = {
                    "color": "#FF5722"
                }
            }
            $scope.RiseProbability = changeTwoDecimal_f(response.data.forecastVo.riseProbility * 100);
            $scope.tag = response.data.forecastVo.tag;
            // .substring(0,1).toUpperCase()+response.data.forecastVo.tag.substring(1)
            // $scope.time = response.data.forecastVo.time;
            $scope.time1 = response.data.forecastVo.time[0];
            $scope.time2 = response.data.forecastVo.time[1];
            $scope.freecount = response.data.freecount;
            var data1ObjList = response.data.forecastVo.data1;
            if (data1ObjList != undefined && data1ObjList.length > 0) {
                data1 = new Array();
                for (let i = 0; i < data1ObjList.length; i++) {
                    let dataitem = data1ObjList[i];
                    let itemArry = new Array(dataitem.time, dataitem.price);
                    data1.push(itemArry);
                }
            }
            valueList = data1.map(function (item) {
                return item[1];
            });
            //预测
            var dataTopObjList = response.data.forecastVo.dataTop;
            var date2FirstTime = "";
            if (dataTopObjList != undefined && dataTopObjList.length > 0) {
                dataTop = new Array();
                for (let i = 0; i < dataTopObjList.length; i++) {
                    let dataitem = dataTopObjList[i];
                    let itemArry = new Array(dataitem.time, dataitem.price);
                    dataTop.push(itemArry);
                    if (i == 0) {
                        date2FirstTime = dataitem.time;
                    }
                }
            }

            var dataMediumObjList = response.data.forecastVo.dataMedium;
            if (dataMediumObjList != undefined && dataMediumObjList.length > 0) {
                dataMedium = new Array();
                for (let i = 0; i < dataMediumObjList.length; i++) {
                    let dataitem = dataMediumObjList[i];
                    let itemArry = new Array(dataitem.time, dataitem.price);
                    dataMedium.push(itemArry);
                }
            }


            var dataBottomObjList = response.data.forecastVo.dataBottom;
            if (dataBottomObjList != undefined && dataBottomObjList.length > 0) {
                dataBottom = new Array();
                for (let i = 0; i < dataBottomObjList.length; i++) {
                    let dataitem = dataBottomObjList[i];
                    let itemArry = new Array(dataitem.time, dataitem.price);
                    dataBottom.push(itemArry);
                }
            }

            //X轴
            // dateList = new Array();
            // var xTimeArray = response.data.forecastVo.xTimeArray;
            // if(xTimeArray!=undefined && xTimeArray.length>0){
            //     let count = parseInt((xTimeArray.length-2)/5);
            //     for (let i = 0; i < xTimeArray.length; i++) {
            //         let item = xTimeArray[i];
            //         if(i==0){
            //             dateList.push(item);
            //         }else if(i==(xTimeArray.length-1)){
            //             dateList.push(item);
            //         }else{
            //             if((xTimeArray.length-i)%count == 0){
            //                 dateList.push(item);
            //             }
            //         }
            //     }
            // }
            dateList = response.data.forecastVo.xTimeArray;
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                visualMap: {
                    show: false,
                    dimension: 0,
                    pieces: [{
                        gte: 0,
                        lt: data1.length,
                        color: '#56B8D3'
                    }, {
                        gte: data1.length,
                        color: '#00DC19'
                    }]
                },
                title: {
                    left: 'center',
                    text: $scope.appname,
                    textStyle: {
                        fontSize: 16,
                    }
                },
                xAxis: [{
                    data: dateList,
                    splitLine: {
                        show: true
                    },
                    axisPointer: {
                        show: true,
                        status: true,
                        type: 'line',
                        value: date2FirstTime,
                        snap: true,
                        lineStyle: {
                            type: 'dotted',
                            width: 2,
                        }
                    }
                }],
                yAxis: [{
                    splitLine: {
                        show: true
                    },
                    offset: 0,
                    min: function (value) {
                        var tmp = value.max - value.min
                        if(value.max >= 1000){
                            return parseInt(value.min-tmp)
                        }
                        if(value.max > 100 && value.map<1000){
                            return parseInt(value.min-tmp)
                        }
                        if(value.max < 100 && value.max>=10){
                            return Math.floor((value.min-tmp) *10)/10
                        }
                        if(value.max < 10 && value.max>1){
                            return Math.floor((value.min-tmp) *100)/100
                        }
                        if(value.max < 1){
                            return Math.floor((value.min-tmp) *1000)/1000
                        }
                        return parseInt(value.min-tmp)
                        
                    }
                }],
                series: [{
                        type: 'line',
                        showSymbol: false,
                        areaStyle: {
                            // color: "rgba(250,250,250,0.5)",
                            color: "#F5F5F5"
                        },
                        lineStyle: {
                            color: "#808080"
                        },
                        data: valueList
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        lineStyle: {
                            color: "#56B8D3",
                            width: 0.8
                        },
                        areaStyle: {
                            color: "rgba(245,254,243,0.3)"

                        },
                        data: dataTop
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        lineStyle: {
                            width: 2,
                            color: $scope.mediumLineColor
                        },
                        areaStyle: {
                            color: "rgba(245,254,243,0.3)",
                            // color: "#F5FEF3"245 254 243
                        },
                        data: dataMedium
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        lineStyle: {
                            color: "#56B8D3",
                            width: 0.8
                            // color: "rgba(181,181,181,0.5)"
                        },
                        areaStyle: {
                            // color: "#FFFFFF"
                            color: "rgba(255,255,255,0.3)",
                        },
                        data: dataBottom
                    }
                ]
            };
            predict.hideLoading();
            predict.setOption(option);
            if (tag) {
                $("#flushforecast").attr("disabled", false);
                $scope.forecastname = "Forecast";
            }
        }).error(function (data) {
            if (data.code == 404) {
                //未登录-判断sessionStorage中是否有登陆过的标记
                if (sessionStorage.getItem("ishaveLogin")) {
                    layer.msg("please login again", {
                        offset: ['90%', '33%']
                    });
                    sessionStorage.removeItem("ishaveLogin");
                } else {
                    layer.msg("please login", {
                        offset: ['90%', '33%']
                    });
                }
                $state.go("app.login", {
                    // "reurl": $location.absUrl()
                });
            }else if(data.code == 400){
                //次数用完，跳转次数用完页面
                // layer.msg(data.msg, {
                //     offset: ['90%', '33%']
                // });
                $state.go("app.lacktime", {
                    "appid": $stateParams.appid,
                    "type": $stateParams.type
                });
            } else {
                layer.msg(data.msg, {
                    offset: ['90%', '33%']
                });
            }
            if (tag) {
                $("#flushforecast").attr("disabled", false);
                $scope.forecastname = "Forecast";
            }
        })
    }
    //预测事件
    $scope.forecast();

    //返回上一页
    $scope.gobackpage = function () {
        $state.go("app.forecast_details", {
            "appid": $stateParams.appid,
            "type": $stateParams.type
        });
    }


    // [['10:00', 3401.97], ['10:15', 300], ['10:30', 200], ['10:45', 500]];

    // data2 = [['10:45', 500], ['11:00', 200], ['11:15', 100], ['11:30', 330]];
    // var dateList = data.map(function (item) {
    //     return item[0];
    // });

    // var dateList = ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'];


    // uiLoad.load(['js/echarts/echarts.js'])


});