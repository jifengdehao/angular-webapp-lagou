"use strict";
angular.module("app",["ui.router","ngCookies","validation"]).run(["$rootScope",function($rootScope){  //run 初始化方法 接["$rootScope",function($rootScope){}]
    $rootScope.im=function(){
        console.log("im");
    }
}]);