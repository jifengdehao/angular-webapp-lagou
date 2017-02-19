"use strict";
angular.module("app").directive("appPositionClass",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/positionClass.html",
        scope:{
            poc:"="
        },
        link:function(scope){
            scope.showPositionList = function(idx) {
                scope.positionList = scope.poc[idx].positionList;
                scope.isActive = idx;
            }
            scope.$watch('poc', function(newVal){
                if(newVal) scope.showPositionList(0);
            })
        }
    }
}]);