"use strict";
angular.module("app").controller("positionCtrl",["$scope","$http","$state","cache","$log",function($scope,$http,$state,cache,$log){
   // $scope.name="position";
    $scope.message="";
    if(cache.get("name")){
        $scope.message="投个简历";
        $scope.isLogin=true;
    }else{
        $scope.message="去登录";
        $scope.isLogin=false;
    }

    $scope.isActive=false;
    $http.get("data/position.json?id="+$state.params.id.json).then(function(resp){
        console.log(resp);
        $scope.positionInfo=resp.data;
        $scope.companyInfo=resp.data;
        console.log($scope.companyInfo)
    },function(resp){
        console.log(resp);
    });
    $scope.go=function(){

        if($scope.isLogin){
            //登录之后投递简历
            $http.post("data/isHandled.json",{id:$scope.positionInfo.id}).success(function(resp){
                console.log(resp);
                if(resp.data.state===0){
                    $scope.message="已投递";
                }
                $log.info(resp);
            });
        }else{
            $state.go("login");
        }
    }
}]);
