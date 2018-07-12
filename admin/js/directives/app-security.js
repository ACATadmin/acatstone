

//控制元素显示可隐藏
directiveModule.directive("securityHtml",function($sessionStorage){
  return {
    scope: {securityId: '@'},
    link: function (scope, elem, attrs, _ngmodel) {
      // console.log("securityId:"+scope.securityId);
      // console.log("permissions:"+$sessionStorage.permissions);
        var permissions = $sessionStorage.permissions;
        for(var i=0;i<permissions.length;i++){
          var obj = permissions[i]
          // console.log("obj:"+obj);
          if(scope.securityId == obj){
            //显示
            return
          }
        }
        elem.remove()
    }
  }
})
