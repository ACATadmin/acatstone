//对象传递
app.factory("paramsFactory",function(){
  var paramsObject = {};
  //定义传递数据的setter函数，用来接收数据
  var _setter = function (data) {
    paramsObject = data;
  };
  //定义获取数据的getter函数
  var _getter = function () {
    return paramsObject;
  };
  // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
  return {
    setter: _setter,
    getter: _getter
  }

})
