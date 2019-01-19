app.controller('media',function($scope,$http,$timeout){
    $scope.flag = -1

        $http.get($scope.app.BaseUrl+"/api/banner/media_list").success(function(response){
            if(response.data != null&&response.data.length>0){
                $scope.flag = 1
                $scope.photos = response.data
            }else{
                $scope.flag = 0
            }
        })
   
   

    $scope.items  = []
    $scope.status = 0
    $scope.page = 0

    $scope.loadData = function(type,page){
        $scope.last = false
        $scope.loading =true
        $http.get($scope.app.BaseUrl+"/api/media/"+type+"?page="+page).success(function(response){
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

    $scope.type = function($event,type){
        if($scope.status != type){
            $scope.status = type
            $scope.page = 0
        }
        if($scope.page == 0){
            $scope.items  = []
        }
        
        $($event.target).siblings().removeClass("on")
        $($event.target).addClass("on")
        $scope.loadData($scope.status,$scope.page)
    }


    $scope.type(this,0)
}).controller("mediaDetail",function($scope,$http,$state,$stateParams){
    $scope.flag = -1
    $http.get($scope.app.BaseUrl+"/api/banner/media_detail").success(function(response){
        if(response.data != null&&response.data.length>0){
            $scope.flag = 1
            $scope.photos = response.data
        }else{
            $scope.flag = 0
        }
    })

    $http.get($scope.app.BaseUrl+"/api/media/detail/"+$stateParams.id).success(function(response){
        $scope.item = response.data
    })
})
 .controller("banner",function($scope,$http,$timeout){
     setTimeout(function () {
         $('#owl-item').owlCarousel({
             items: 1,
             loop: true,
             autoplay: true,
             dots: false,
             nav: true
         });
     }, 100)

    })