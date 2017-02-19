"use strict";
angular.module("app").directive("appHeadBar",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/headBar.html",
        scope:{
          text:"@"
        },
        link:function(scope,elemnet,attr){
            scope.back=function(){
                window.history.back();
            };
            scope.$on("abc",function(event,data){
                console.log(event,data);
            });
            scope.$emit("cba",{name:"张三"}); //向上传播
        }
    }
}]);