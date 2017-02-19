"use strict";
angular.module("app").controller("loginCtrl",["$scope","$http","$state","cache",function($scope,$http,$state,cache){
    $scope.name="login";
    $scope.user={};
    $scope.submit=function(){
        $http.post("data/login.json",$scope.user).success(function(resp){
            console.log(resp);
            cache.put("id",resp.data.id);
            cache.put("name",resp.data.name);
            cache.put('image',resp.data.image);
            $state.go("main");
        });
        console.log($scope.user);
    }
}]);
