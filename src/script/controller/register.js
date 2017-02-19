"use strict";
angular.module("app").controller("registerCtrl",["$scope","$http","$interval","$state",function($scope,$http,$interval,$state){
    $scope.name="register";
    $scope.user={};
    $scope.submit=function(){
        $http.post("data/register.json",$scope.user).success(function(resp){
            console.log(resp);
            if(resp.data.state=== 1){
                alert("注册成功");
                $state.go("login");
            }
        });
        console.log($scope.user);
    };
    var count=60;
    $scope.send=function(){
        $http.get("data/code.json").then(function(resp){
            console.log(resp.data);
            if(resp.data.state === 1){
                $scope.time="60s";
                count=60;
                var interval=$interval(function(){
                    if(count<=0){
                        $interval.cancel(interval);
                        $scope.time="";
                        return;
                    }else{
                        count--;
                        $scope.time=count+"s";
                    }
                },1000);
            }
        },function(resp){
            console.log(resp);
        })
    }
}]);
