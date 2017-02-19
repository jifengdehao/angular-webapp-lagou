"use strict";
angular.module("app").directive("appHead",["cache",function(cache){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/head.html",
        link:function($scope){
            if(cache.get("name")){
                $scope.name=cache.get("name");
            }else{
                $scope.name=false;
            }

        }
    }
}]);