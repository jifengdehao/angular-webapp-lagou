"use strict";
angular.module("app").controller("searchCtrl",["$scope","$http","$state","cache","dict",function($scope,$http,$state,cache,dict){
    $scope.name="";
    $scope.search=function(){
        $http.get("data/positionList.json").then(function(resp){
            console.log(resp);
            $scope.positionList=resp.data;
        },function(resp){
            console.log(resp);
        });
    };
    $scope.search();
    $scope.sheet = {};
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];
    $scope.filterObj = {};
    var tabId = '';
    $scope.tClick = function(id,name) {
        tabId = id;
        $scope.sheet.list = dict[id];
        $scope.sheet.visible = true;
    };
    $scope.sClick = function(id,name) {
        if(id) {
            angular.forEach($scope.tabList, function(item){
                if(item.id===tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
            console.log($scope.filterObj);
            console.log( $scope.filterObj[tabId + 'Id']);
        } else {
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item){
                if(item.id===tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    }

}]);
