"use strict";
angular.module("app").controller("favoriteCtrl",["$scope","$http",function($scope,$http){
    $scope.name="favorite";
    $http.get("data/myFavorite.json").then(function(resp){
        console.log(resp);
        $scope.myFavoritePositionList=resp.data;
    },function(resp){
        console.log(resp);
    })
}]);
