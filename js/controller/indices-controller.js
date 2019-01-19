app.controller('indices',function ($scope, $http, $state){
    //获取广告
  $scope.flag = -1
  $http.get($scope.app.BaseUrl+"/api/banner/ace_indices").success(function(response){
      if(response.data != null&&response.data.length>0){
          $scope.flag = 1
          $scope.photos = response.data
      }else{
          $scope.flag = 0
      }
  })

  $scope.goDetails = function (item) {
      $state.go("app.forecast_details", {
        "appid": item.id,
        "type": $scope.type
      });
    }

    $scope.items  = []
    $scope.page = 0
  
    $scope.loadData = function(page){
      $scope.last = false
      $scope.loading =true
      $http.get($scope.app.BaseUrl + "/api/application?page="+page+"&size=10&type=ace_indices").success(function(response){
          $scope.last = response.data.last
              $scope.items = $scope.items.concat(response.data.content)
              $scope.loading = false;
              if(!$scope.last){
                  $scope.page ++ 
              }
      }).error(function(data){
          layer.msg(data.msg, {
              offset: ['90%', '33%']
          });
      $scope.loading = false;
      })
  }
  $scope.loadData(0)

}).controller("indiceE",function($scope,$http,$state,$stateParams){
    $scope.gobackpage = function () {
        $state.go("app.forecast_details", {
            "appid": $stateParams.appid,
            "type": $stateParams.type
        });
      }

    var myChart = echarts.init(document.getElementById('main'));
    option = {
        grid: {
            show:true,
            top: "25",
            left: "0",
            right: "0",
            bottom: "25px",
            backgroundColor:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(23,25,29,0)'
                },{
                    offset: 0.8, color: 'rgba(23,25,29,0)'
                }, {
                    offset: 1, color: 'rgba(23,25,29,1)'
                }],
                globalCoord: false // 缺省为 false
            },
            borderColor:'transparent'
        },
        legend:{
            show:false,
            padding:0
        },
        tooltip:{
            show:true,
            trigger: 'axis',
            snap: true,
        },
        xAxis: {
            type: 'time',
            axisPointer:{
                type:'line',
                lineStyle: {
                    color: "#ff5722",
                    opacity:1,
                    width: 0.2
                },
                label: {
                    show: true,
                    formatter:function(params){
                        return echarts.format.formatTime('MM-dd hh:mm', params.value)
                    }
                },
            },
            nameTextStyle:{
                color:'#d8d8d8'
            },
            boundaryGap:false,
            axisLine:{
                show:false
            },
            axisLabel:{
                formatter:function(value,index){
                    //不显示第一个和最后一个
                    if(index == 0||value == $scope.end){
                        return ""
                    }
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];
                    return texts.join('/');
                },
                fontSize:8
            },
            axisTick:{
                show:false
            },
            splitLine:{
                show:false
            },
            z:10
        },
        yAxis: [
            {
                type:"value",
                axisPointer:{
                    label: {
                        show: true,
                        formatter:function(params){
                            return params.value.toFixed(2)
                        }
                    },
                },
                axisLabel:{
                    inside:true,
                    formatter:function(value,index){
                        if(index ==0 ){
                            return ""
                        }else{
                            return value
                        }
                    },
                    color:"#ffffff",
                    fontSize:8,
                },
                nameTextStyle:{
                    color:'#d8d8d8',
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false,
                },
                splitLine:{
                    show:false
                },
                scale:true,
                splitNumber:3
            },
            {
                type:"value",
                axisPointer:{
                    label: {
                        show: true,
                        formatter:function(params){
                            return params.value.toFixed(2)
                        }
                    },
                },
                axisLabel:{
                    inside:true,
                    formatter:function(value,index){
                        if(index ==0 ){
                            return ""
                        }else{
                            return value
                        }
                    },
                    color:"#ffffff",
                    fontSize:8,
                },
                nameTextStyle:{
                    color:'#d8d8d8',
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                scale:true,
                splitNumber:3,
            }
        ],
        backgroundColor:{
        },

        series: [
            {
                symbol:'none',
                type: 'line',
                yAxisIndex:0,
                itemStyle:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#ff5722'
                        }, {
                            offset: 1, color: '#ff5722'
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
                lineStyle:{
                    width:0.5
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#ff5722'
                            }, {
                                offset: 1, color: '#ff5722'
                            }],
                            globalCoord: false // 缺省为 false
                    },
                    opacity:0.05,
                },
                markPoint : {
                    symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                    itemStyle:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#ff5722'
                            }, {
                                offset: 1, color: '#ff5722'
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    symbolSize:[50, 30],
                    symbolOffset:[0,-20],
                    label: {
                        offset: [0, 0],
                        color: '#ffffff',
                        fontFamily:'Arial',
                        fontSize:13,
                        align:'center',
                        formatter:[
                            'BTH'
                        ].join('\n'),
                    },
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
            },
            {
                symbol:'none',
                // data: [1600, 1700,1700, 1700, 2000,1600, 1400,1700,1800,2300,2100,2000],
                type: 'line',
                yAxisIndex:1,
                itemStyle: {
                    color: {
                            type: 'radial',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#7A19B2'
                            }, {
                                offset: 1, color: '#7A19B2'
                            }],
                            globalCoord: false // 缺省为 false
                        }
                },
                lineStyle:{
                    width:0.5
                },
                areaStyle: {
                    color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#7A19B2'
                            }, {
                                offset: 1, color: '#7A19B2'
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        opacity:0.15
                },
                markPoint : {
                    symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                    itemStyle:{
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: '#7A19B2'
                            }, {
                                offset: 1, color: '#7A19B2'
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    symbolSize:[50, 30],
                    symbolOffset:[0,-20],
                    label: {
                        offset: [0, 0],
                        color: '#ffffff',
                        fontFamily:'Arial',
                        fontSize:13,
                        align:'center',
                        formatter:[
                            'BTC'
                        ].join('\n'),
                    },
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
            }
        ],
        useUTC:true
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0)',
        zlevel: 0
      });


    $scope.indices = function(){
        $http.get($scope.app.BaseUrl + "/api/indices/"+$stateParams.appid).success(function(response){
                $scope.indices_data = []
                var datas = response.data.data
                $scope.item = response.data.vo
                for(var i=0;i<datas.length;i++){  
                    $scope.indices_data.push([datas[i].createTime,datas[i].indices]);
                }
                if($scope.indices_data.length > 0){
                    $scope.start = $scope.indices_data[0][0]
                    $scope.end = $scope.indices_data[$scope.indices_data.length - 1][0]
                }  

                myChart.setOption({
                    series: [
                        {
                            symbol:'none',
                            data: $scope.indices_data,
                            type: 'line',
                            yAxisIndex:0,
                            itemStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#ff5722'
                                    }, {
                                        offset: 1, color: '#ff5722'
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            lineStyle:{
                                width:0.5
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0, color: '#ff5722'
                                        }, {
                                            offset: 1, color: '#ff5722'
                                        }],
                                        globalCoord: false // 缺省为 false
                                },
                                opacity:0.05,
                            },
                            markPoint : {
                                symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                                itemStyle:{
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0, color: '#ff5722'
                                        }, {
                                            offset: 1, color: '#ff5722'
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                                },
                                symbolSize:[50, 30],
                                symbolOffset:[0,-20],
                                label: {
                                    offset: [0, 0],
                                    color: '#ffffff',
                                    fontFamily:'Arial',
                                    fontSize:13,
                                    align:'center',
                                    formatter:[
                                        'TOP10'
                                    ].join('\n'),
                                },
                                data : [
                                    {type : 'max', name: '最大值'}
                                ],
                                emphasis:{
                                    label:{
                                        barBorderRadius:0
                                    }
                                }
                            },
                        },
                        {
                            symbol:'none',
                            data: [],
                            type: 'line',
                            yAxisIndex:1,
                            itemStyle: {
                                color: {
                                        type: 'radial',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0, color: '#7A19B2'
                                        }, {
                                            offset: 1, color: '#7A19B2'
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                            },
                            lineStyle:{
                                width:0.5
                            },
                            areaStyle: {
                                color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0, color: '#7A19B2'
                                        }, {
                                            offset: 1, color: '#7A19B2'
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    opacity:0.15
                            },
                            markPoint : {
                                symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                                itemStyle:{
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0, color: '#7A19B2'
                                        }, {
                                            offset: 1, color: '#7A19B2'
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                                },
                                symbolSize:[50, 30],
                                symbolOffset:[0,-20],
                                label: {
                                    offset: [0, 0],
                                    color: '#ffffff',
                                    fontFamily:'Arial',
                                    fontSize:13,
                                    align:'center',
                                    formatter:[
                                        'BTC'
                                    ].join('\n'),
                                },
                                data : [
                                    {type : 'max', name: '最大值'}
                                ]
                            },
                        }
                    ],
                })
  
                myChart.hideLoading();
        }).error(function(data){
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
        })
    }
    $scope.indices()

    $scope.coinData = function(event,coinId,coin){
        myChart.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0)',
            zlevel: 0
          });
        console.log(coinId)
        var coin_data = []
        $(".lists").children("div").removeClass("selected")
        $(event.target).parent().addClass("selected")
        var url = $scope.app.BaseUrl + "/api/coins/"+coinId+"?startTime="+$scope.start+"&endTime="+$scope.end
        $http.get(url).success(function(response){
            var datas = response.data
            for(var i=0;i<datas.length;i++){  
                coin_data.push([datas[i].createTime,datas[i].closePrice]);
            }
            myChart.hideLoading();
            myChart.setOption({
                series: [
                    {
                        symbol:'none',
                        data: $scope.indices_data,
                        type: 'line',
                        yAxisIndex:0,
                        itemStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [{
                                    offset: 0, color: '#ff5722'
                                }, {
                                    offset: 1, color: '#ff5722'
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        lineStyle:{
                            width:0.5
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#ff5722'
                                    }, {
                                        offset: 1, color: '#ff5722'
                                    }],
                                    globalCoord: false // 缺省为 false
                            },
                            opacity:0.05,
                        },
                        markPoint : {
                            symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                            itemStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#ff5722'
                                    }, {
                                        offset: 1, color: '#ff5722'
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            symbolSize:[50, 30],
                            symbolOffset:[0,-20],
                            label: {
                                offset: [0, 0],
                                color: '#ffffff',
                                fontFamily:'Arial',
                                fontSize:13,
                                align:'center',
                                formatter:[
                                    'TOP10'
                                ].join('\n'),
                            },
                            data : [
                                {type : 'max', name: '最大值'}
                            ],
                            emphasis:{
                                label:{
                                    barBorderRadius:0
                                }
                            }
                        },
                    },
                    {
                        symbol:'none',
                        data: coin_data,
                        type: 'line',
                        yAxisIndex:1,
                        itemStyle: {
                            color: {
                                    type: 'radial',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#7A19B2'
                                    }, {
                                        offset: 1, color: '#7A19B2'
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                        },
                        lineStyle:{
                            width:0.5
                        },
                        areaStyle: {
                            color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#7A19B2'
                                    }, {
                                        offset: 1, color: '#7A19B2'
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                opacity:0.15
                        },
                        markPoint : {
                            symbol:'path://M41.3114754,29.3103448 L36.5901639,34 L31.8688525,29.3103448 L4,29.3103448 C1.790861,29.3103448 2.23265109e-15,27.5194838 0,25.3103448 L0,4 C-2.705415e-16,1.790861 1.790861,-1.37054459e-15 4,-1.77635684e-15 L68,0 C70.209139,-4.05812251e-16 72,1.790861 72,4 L72,25.3103448 C72,27.5194838 70.209139,29.3103448 68,29.3103448 L41.3114754,29.3103448 Z',
                            itemStyle:{
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#7A19B2'
                                    }, {
                                        offset: 1, color: '#7A19B2'
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            symbolSize:[50, 30],
                            symbolOffset:[0,-20],
                            label: {
                                offset: [0, 0],
                                color: '#ffffff',
                                fontFamily:'Arial',
                                fontSize:13,
                                align:'center',
                                formatter:[
                                    coin
                                ].join('\n'),
                            },
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        },
                    }
                ]
            });
        })
    }
})