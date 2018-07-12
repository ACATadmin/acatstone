app.filter('highlight', function () {
  return function (text, search, caseSensitive) {
    if (search || angular.isNumber(search)) {
      text = text.toString();
      search = search.toString();
      if (caseSensitive) {
        return text.split(search).join('<span class="ui-match">' + search + '</span>');
      } else {
        return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
      }
    } else {
      return text;
    }
  };
});

app.filter('casestatus', function () {
  return function(inputArray){
    switch (inputArray) {
      case 0:
        return "草稿";
      case 1:
        return "审核中";
      case 2:
        return "已确认";
      case 3:
        return "已驳回";
      case 4:
        return "进行中";
      case 5:
        return "已结案";
      case 6:
        return "已移交";
    }
  }
});

app.filter('genderstatus', function () {
  return function(inputArray){
    if(inputArray == 0){
      return "女"
    }else{
      return "男"
    }
  }
});

app.filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
      return $sce.trustAsHtml(text);
  };
}]);
