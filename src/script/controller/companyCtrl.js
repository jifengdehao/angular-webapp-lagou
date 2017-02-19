"use strict";
angular.module("app").controller("companyCtrl",["$scope","$http","$state","cache",function($scope,$http,$state,cache){
    $scope.name="company";
    $http.get("data/company.json?id="+$state.params.id).then(function(resp){
        console.log(resp);
        $scope.companyInfo=resp.data;
        $scope.$broadcast("abc",{id:22}); //向下广播
    },function(resp){
        console.log(resp);
    });
    $scope.$on("cba",function(event,data){ //从往上接受
        console.log(event,data);
    });



}]);
