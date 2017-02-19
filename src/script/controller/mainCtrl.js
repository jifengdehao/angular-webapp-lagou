"use strict";
angular.module("app").controller("mainCtrl",["$scope","$http","cache",function($scope,$http,cache){
    cache.put("hello","angular");
    cache.remove("hello");
    cache.put("to","you");
    console.log(cache.get("to"));
   /* $scope.name="main";
    $scope.list=[
        {
            id:"1232",
            name:"销售",
            companyName:"千度",
            city:"上海",
            industry:"互联网",
            time:"2016-10-1 11:05",
            imgSrc:"image/company-3.png"
        },
        {
            id:"1233",
            name:"Web前端",
            companyName:"慕课网",
            city:"北京",
            industry:"互联网",
            time:"2016-10-2 18:05",
            imgSrc:"image/company-1.png"
        }
    ]*/
    $http({
        method: 'GET',
        url: '/data/positionList.json'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.list=response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
   /* $http.get("data/positionList.json").then(function(response){
        console.log(response);
    },function(response){
        console.log(response);
    })*/

    $scope.im();





}]);
