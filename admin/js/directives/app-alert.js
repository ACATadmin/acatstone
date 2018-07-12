var modalModule = angular.module('app-modal', []);
modalModule.provider("modal",function(){
  var compiled = false;
  var title = "提示"
  var content = "您确定要这么做吗？"


  this.$get = function ($compile, $rootScope, $timeout, $q,$modal) {
    function alert(content) {
      var defer = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: '/admin/tpl/modal-alert.html',
        controller:function($scope,$modalInstance){
          $scope.content = content;
          $scope.ok = function () {
            $modalInstance.close();
          };
        }
      });

      return defer.promise;
    }

    function dialog(content,success,cancel) {
      var defer = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: '/admin/tpl/modal.html',
        controller:function($scope,$modalInstance){
          $scope.content = content
          $scope.ok = function () {
            success()
            $modalInstance.close();
          };
          $scope.cancel = function () {
            if(cancel!=null){
              cancel()
            }
            $modalInstance.dismiss("cancel");
          };
        }
      });

      return defer.promise;
    }

    function imagecrop(size) {
      var defer = $q.defer();
      var modalInstance = $modal.open({
        templateUrl: '/admin/tpl/imagecrop.html',
        controller:function($scope){
          $scope.myImage='';
          $scope.myCroppedImage='';
          $scope.cropType="circle";
          var handleFileSelect=function(evt) {
            console.log(2222);
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
              });
            };
            reader.readAsDataURL(file);
          };
          angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
      });

      return defer.promise;
    }

    return {
      alert:function(content){
        return alert(content)
      },
      dialog: function (content,success,cancel) {
        return dialog(content, success,cancel);
      },
      imagecrop:function (size) {
        return imagecrop(size)
      }
    }
  }
})

/**
* @author Arvin Cao
* @version 1.0
* @time 17/3/15 下午1:20
* @Description  弹出框指令
*/
modalModule.directive('modalAlert', function ($scope,$timeout,$modal) {
  var modalInstance = $modal.open({
    templateUrl: '/admin/tpl/modal-alert.html',
    resolve: {
      items: function() {
        return $scope.items;
      }
    }
  });
  // return {
  //     scope: {
  //         title: '=',
  //         content: '='
  //     },
  //     templateUrl: "/tpl/modal-alert.html"
  // }
});

/**
* @author Arvin Cao
* @version 1.0
* @time 17/7/24 下午1:20
* @Description  图片上传弹出框
*/
modalModule.directive('modalImageUpload', function ($scope,$timeout,$modal) {
  var modalInstance = $modal.open({
    templateUrl: '/admin/tpl/imagecrop.html',
    resolve: {
      items: function() {
        return $scope.items;
      }
    }
  });

});
