app.controller('echarts', function ($scope, $http, $state, $stateParams,modal, $modal) {
    // 基于准备好的dom，初始化echarts实例
    var data1;
    var data2;
    var dateList;
    var valueList;

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
    $http.get($scope.app.BaseUrl + "/api/application/" + $stateParams.appid + "/forecast").success(function (response) {
        $scope.appname = response.data.appname;
        $scope.averagechange = changeTwoDecimal_f(response.data.forecastVo.avgChange * 100);
        $scope.RiseProbability = changeTwoDecimal_f(response.data.forecastVo.riseProbility * 100);
        $scope.tag = response.data.forecastVo.tag;
        // .substring(0,1).toUpperCase()+response.data.forecastVo.tag.substring(1)
        $scope.time = response.data.forecastVo.time;
        var predict = echarts.init(document.getElementById('predict'));
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
        var data2ObjList = response.data.forecastVo.data2;
        var date2FirstTime = "";
        if (data2ObjList != undefined && data2ObjList.length > 0) {
            data2 = new Array();
            for (let i = 0; i < data2ObjList.length; i++) {
                let dataitem = data2ObjList[i];
                let itemArry = new Array(dataitem.time, dataitem.price);
                data2.push(itemArry);
                if (i == 0) {
                    date2FirstTime = dataitem.time;
                }
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
                    return parseInt(value.min) - 100;
                }

            }],
            series: [{
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {
                        color: "#F5FEF3"
                    },
                    data: valueList
                },
                {
                    type: 'line',
                    showSymbol: false,
                    data: data2
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        predict.setOption(option);

        window.onresize = function () {
            predict.resize();

        };
    }).error(function (data) {
        if(data.code == 404){
            //未登录-判断sessionStorage中是否有登陆过的标记
            if(sessionStorage.getItem("ishaveLogin")){
                layer.msg("please log in again", {
                    offset: ['90%', '33%']
                });
                sessionStorage.removeItem("ishaveLogin");
            }else{
                layer.msg("please log in", {
                    offset: ['90%', '33%']
                });
            }
            $state.go("app.login");
        }else{
            layer.msg(data.msg, {
                offset: ['90%', '33%']
            });
        }
    })
    // [['10:00', 3401.97], ['10:15', 300], ['10:30', 200], ['10:45', 500]];

    // data2 = [['10:45', 500], ['11:00', 200], ['11:15', 100], ['11:30', 330]];
    // var dateList = data.map(function (item) {
    //     return item[0];
    // });

    // var dateList = ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'];


    // uiLoad.load(['js/echarts/echarts.js'])

});