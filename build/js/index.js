"use strict";
angular.module("app",["ui.router","ngCookies","validation"]).run(["$rootScope",function($rootScope){  //run 初始化方法 接["$rootScope",function($rootScope){}]
    $rootScope.im=function(){
        console.log("im");
    }
}]);
'use strict';
angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http){
    $http.get('data/city.json').then(function(resp){
        dict.city = resp.data;
    });
    $http.get('data/salary.json').then(function(resp){
        dict.salary = resp.data;
    });
    $http.get('data/scale.json').then(function(resp){
        dict.scale = resp.data;
    });
}]);

"use strict";
angular.module('app').config(['$provide', function($provide){
    $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
        $delegate.post = function(url, data, config) {
            var def = $q.defer();
            $delegate.get(url).then(function(resp) {
                def.resolve(resp);
            },function(err) {
                def.reject(err);
            });
            return {
                success: function(cb){
                    def.promise.then(cb);
                },
                error: function(cb) {
                    def.promise.then(null, cb);
                }
            }
        }
        return $delegate;
    }]);
}]);


"use strict";
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    }).state("position",{
        url:"/position/:id",
        templateUrl:"view/position.html",
        controller:"positionCtrl"
    }).state("company",{
        url:"/company/:id",
        templateUrl:"view/company.html",
        controller:"companyCtrl"
    }).state("search",{
        url:"/search",
        templateUrl:"view/search.html",
        controller:"searchCtrl"
    }).state("login",{
        url:"/login",
        templateUrl:"view/login.html",
        controller:"loginCtrl"
    }).state("register",{
        url:"/register",
        templateUrl:"view/register.html",
        controller:"registerCtrl"
    }).state("me",{
        url:"/me",
        templateUrl:"view/me.html",
        controller:"meCtrl"
    }).state("post",{
        url:"/post",
        templateUrl:"view/post.html",
        controller:"postCtrl"
    }).state("favorite",{
        url:"/favorite",
        templateUrl:"view/favorite.html",
        controller:"favoriteCtrl"
    });
    $urlRouterProvider.otherwise('main');
}]);
'use strict';
angular.module('app').config(['$validationProvider', function($validationProvider) {
    var expression = {
        phone: /^1[\d]{10}$/,
        password: function(value) {
            var str = value + ''
            return str.length > 5;
        },
        required: function(value) {
            return !!value;
        }
    };
    var defaultMsg = {
        phone: {
            success: '',
            error: '必须是11位手机号'
        },
        password: {
            success: '',
            error: '长度至少6位'
        },
        required: {
            success: '',
            error: '不能为空'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);

"use strict";
angular.module("app").controller("companyCtrl",["$scope","$http","$state","cache",function($scope,$http,$state,cache){
    $scope.name="company";
    $http.get("data/company.json?id="+$state.params.id).then(function(resp){
        console.log(resp);
        $scope.companyInfo=resp.data;
        $scope.$broadcast("abc",{id:22}); //向下广播
    },function(resp){
        console.log(resp);
    });
    $scope.$on("cba",function(event,data){ //从往上接受
        console.log(event,data);
    });



}]);

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

"use strict";
angular.module("app").controller("mainCtrl",["$scope","$http","cache",function($scope,$http,cache){
    cache.put("hello","angular");
    cache.remove("hello");
    cache.put("to","you");
    console.log(cache.get("to"));
   /* $scope.name="main";
    $scope.list=[
        {
            id:"1232",
            name:"销售",
            companyName:"千度",
            city:"上海",
            industry:"互联网",
            time:"2016-10-1 11:05",
            imgSrc:"image/company-3.png"
        },
        {
            id:"1233",
            name:"Web前端",
            companyName:"慕课网",
            city:"北京",
            industry:"互联网",
            time:"2016-10-2 18:05",
            imgSrc:"image/company-1.png"
        }
    ]*/
    $http({
        method: 'GET',
        url: '/data/positionList.json'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.list=response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
   /* $http.get("data/positionList.json").then(function(response){
        console.log(response);
    },function(response){
        console.log(response);
    })*/

    $scope.im();





}]);

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

"use strict";
angular.module("app").controller("postCtrl",["$scope","$http",function($scope,$http){
    $scope.name="post";
    $scope.tabList=[
        {
            id:"all",
            name:"全部"
        },
        {
            id:"pass",
            name:"面试邀请"
        },
        {
            id:"fail",
            name:"不合适"
        }
    ];
    $http.get("data/myPost.json").then(function(resp){
        console.log(resp);
        $scope.myPositionList=resp.data;
    },function(resp){
        console.log(resp);
    });
    $scope.filterObj={};
    $scope.tClick=function(id,name){
        switch (id){
            case "all":
                delete  $scope.filterObj.state;
                break;
            case "pass":
                $scope.filterObj.state="1";
                break;
            case "fail":
                $scope.filterObj.state="-1";
                break;
        }
    }
}]);

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

'use strict';
angular.module('app').filter('filterByObj', [function(){
    return function(list, obj) {
        var result = [];

        angular.forEach(list, function(item){
            var isEqual = true;
            for(var e in obj){
                if(item[e]!==obj[e]) {
                    isEqual = false;
                }
            }
            if(isEqual) {
                result.push(item);
            }
        });
        return result;
    };
}]);

'use strict';
/*angular.module('app').service('cache', ['$cookies', function($cookies){
    this.put = function(key, value){
        $cookies.put(key, value);
    };
    this.get = function(key) {
        return $cookies.get(key);
    };
    this.remove = function(key) {
        $cookies.remove(key);
    };
}]);*/
angular.module("app").factory("cache",["$cookies",function($cookies){
    return{
       get : function(key) {
        return $cookies.get(key);
       },
       put : function(key, value){
            $cookies.put(key, value);
       },
       remove:function(key){
           $cookies.remove(key);
       }
   }
}]);
"use strict";
angular.module("app").directive("appCompany",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/company.html",
        scope:{
            cny:"="
        }
    };
}]);

"use strict";
angular.module("app").directive("appFoot",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/foot.html",
        link:function(){

        }
    }
}]);

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
"use strict";
angular.module("app").directive("appPositionInfo",["$http",function($http){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/positionInfo.html",
        scope:{
            isActive:"=",
            isLogin:"=",
            pos:"="
        },
        link:function($scope){
            $scope.$watch('pos', function(newVal) {
                if(newVal) {
                    $scope.pos.select = $scope.pos.select || false;
                    $scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
                }
            });


            $scope.favorite=function(){
                $http.post("data/favorite.json",{
                    id:$scope.pos.id,
                    select:!$scope.pos.select
                }).success(function(resp){
                    console.log(resp);
                    $scope.pos.select=!$scope.pos.select;
                    $scope.imagePath= $scope.pos.select ?"image/star-active.png" : "image/star.png";
                })
            };

        }
    };
}]);

"use strict";
angular.module("app").directive("appPositionList",["$http",function($http){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/positionList.html",
        scope:{
            data:'=',
            filterObj: '=',
            isFavorite:"="
        },
        link:function($scope){
            $scope.select=function(item){
                $http.post('data/favorite.json', {id: item.id, select: !item.select}).success(function(resp){
                    console.log(resp);
                    item.select = !item.select;
                });
            }
        }
    };
}]);

"use strict";
angular.module("app").directive("appSheet",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/sheet.html",
        scope:{
            list:"=",
            visible:"=",
            select:"&"
        }
    }
}]);

"use strict";
angular.module("app").directive("appTab",[function(){
    return{
        restrict:"A",
        replace:true,
        templateUrl:"view/template/tab.html",
        scope:{
            list:"=",
            tabClick:"&"
        },
        link:function(scope){
            scope.click=function(tab){
                scope.selectId=tab.id;
                scope.tabClick(tab);
            }
        }
    }
}]);
