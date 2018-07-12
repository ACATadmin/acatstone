/*!
 * uploader-controller.js
 * User: 徐佳乐.
 * Date: 2018/5/9.
 * Time: 15:20.
 */
app.controller('uploader', ['$scope', 'FileUploader', function ($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php' //换成自己的上传地址，本地演示不换也行
    });
    uploader.onAfterAddingFile = function (fileItem) {
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
}]);
app.controller('uploader2', ['$scope', 'FileUploader', function ($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php' //换成自己的上传地址，本地演示不换也行
    });
    uploader.onAfterAddingFile = function (fileItem) {
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
}]);
