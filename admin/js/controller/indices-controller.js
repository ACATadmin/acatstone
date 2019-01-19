app.controller('indices-config',function($scope,$http,modal){
    //配置
    $http.get($scope.app.BaseUrl+"/admin/indices/config").success(function(response){
        var obj = JSON.parse(response.data.config) 
        $scope.divisor = obj.divisor
        $scope.emails = obj.emails
    }).error(function(data){
        modal.alert(data.msg);
    })
    //top10
    $http.get($scope.app.BaseUrl+"/admin/indices/top10").success(function(response){
        var coins = JSON.parse(response.data.data)
        $scope.top10_items = []
        var list = new Array()
        for(var i=0;i<coins.length;i++){
            if(i%5==0&&i!=0){
                $scope.top10_items.push(list.concat())
                list = new Array()
            }
            var coin = coins[i]
            list.push(coin)
        }
        if(list.length >0){
            $scope.top10_items.push(list.concat())
        }
    }).error(function(data){
        modal.alert(data.msg);
    })
    //pool
    $http.get($scope.app.BaseUrl+"/admin/indices/sample/pool").success(function(response){
        var jsonObj = JSON.parse(response.data.coins) 
        $scope.pool_items = new Array()
        var list = new Array()
        for(var i=0;i<jsonObj.length;i++){
            if(i%5==0&&i!=0){
                $scope.pool_items.push(list.concat())
                list = new Array()
            }
            var coin = jsonObj[i]
            list.push(coin)
        }
        if(list.length >0){
            $scope.pool_items.push(list.concat())
        }
        console.log($scope.pool_items)
    }).error(function(data){
        modal.alert(data.msg);
    })

    $scope.saveEmail = function(){
        var params = {
            "email":$scope.email
        }
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test($scope.email)){
			modal.dialog("您确定要添加此邮箱为通知邮箱吗？\n"+$scope.email,function(){
                $http.post($scope.app.BaseUrl+"/admin/indices/config/email/",params).success(function(response){
                    modal.alert("添加通知邮箱成功")
                }).error(function(data){
                    modal.alert("添加通知邮箱失败")
                })
            })
		}else{
			modal.alert("邮箱格式不正确");
		}
    }

    $scope.deleteEmail = function(email){
        var params = {
            "email":email
        }
        modal.dialog("您确定要添加此邮箱为通知邮箱吗？\n"+email,function(){
            $http.post($scope.app.BaseUrl+"/admin/indices/config/email/delete",params).success(function(response){
                modal.alert("删除通知邮箱成功")
            }).error(function(data){
                modal.alert("删除通知邮箱失败")
            })
        })
    }
})