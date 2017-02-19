"use strict";
angular.module("app").controller("meCtrl",["$scope","cache","$state",function($scope,cache,$state){
   // $scope.name="me";
    if(cache.get("name")){
        $scope.name=cache.get("name");
        $scope.image=cache.get("image");
    }
    $scope.logout=function(){
        cache.remove("id");
        cache.remove("name");
        cache.remove("image");
        $state.go("me");
    }
}]);
