/*!
 * home_controller.js
 * User: 徐佳乐.
 * Date: 2018/5/21.
 * Time: 14:22.
 */
// app.controller('homeCtrl', ['$scope', function ($scope) {
app.controller("homeCtrl", function ($scope, $http, $state, $stateParams, modal, $modal) {

    $(function () {
        $('#dowebok').fullpage({
            verticalCentered: false,
        });
    });
    $scope.golist = function () {
        $state.go("app.text_list",{type:1})
    }
    //是否刷新页面
    // if($stateParams.reload){
    //     $state.reload();
    //     $stateParams.reload=false;
    // }
});