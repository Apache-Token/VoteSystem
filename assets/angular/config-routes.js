define(function (require) {
	
    var app = require('./app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);
	
	//配置常量
	app.constant("http", "http://localhost:63342/voteSystem/20160629V0101/");
	app.constant("errorMessage", "服务器异常,请稍后重试!")

	//配置路由
    app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    	//去掉URL的#
    	//$locationProvider.html5Mode(true);
    	//默认的首页
        //$urlRouterProvider.otherwise('/home');

        //禁用ajax请求缓存
        if(!$httpProvider.defaults.headers.get){
        	$httpProvider.defaults.headers.get = {};
        }
        //配置http发送模式
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        $httpProvider.defaults.transformRequest = function(data){
        	//当参数不为空的时候
        	if(data){
        		return JSON.stringify(data);
        	}
        }
		//页面跳转
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'page/home/home.html',
                controllerUrl: 'controller/home',
                controller: 'home'
            })
            .state('book',{
                url:'/book',
                templateUrl: 'page/book/book.html',
                controllerUrl: 'controller/book',
                controller: 'book'
            })
            .state('svg',{
                url:'/svg',
                templateUrl: 'page/svg/svg.html'
            })
    }]);
   
   
   //Service
   
   app.service("httpService",function($http, http, errorMessage){
        //带错误参数的POST请求
        this.post = function(url, params, success, error){
            showLoadding().then(function(){
                $http.post(http + url, params).success(function(resp){
                    result(resp, success, error);
                    hideLoadding();
                }).error(function(resp){
                    hideLoadding();
                    layer.msg(errorMessage);
                });
            })
        };

       //带错误参数的GET请求
       this.get = function(url, success, error){
           showLoadding().then(function() {
               $http.get(http + url).success(function (resp) {
                   result(resp, success, error);
                   hideLoadding();
               }).error(function (resp) {
                   hideLoadding();
                   layer.msg(errorMessage);
               });
           });
       };

       //带错误参数的PUT请求
       this.put = function(url, params, success, error){
           showLoadding().then(function() {
               $http.put(http + url).success(function (resp) {
                   result(resp, success, error);
                   hideLoadding();
               }).error(function () {
                   hideLoadding();
                   layer.msg(errorMessage);
               });
           });
       };

       //数据请求返回值处理
       function result(resp, success, error){
           success(resp);
       };
       //获取地址栏参数
       this.getUrlParam = function(name){
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
           var r = window.location.search.substring(1).match(reg);
           if(r != null)
           //地址栏的汉子转码写法(防止乱码)
           return decodeURI(r[2]);
           //普通写法
           //return unescape(r[2]);
           return null;
       };
       //StartLoadding
       function showLoadding(){
           var def = $.Deferred();
           $lod = "";
           $lod += "<div class='loading'>";
           $lod += "<div id='pageloader' class='pageload-overlay show pageloading-loading'>";
           $lod += "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 80 60' preserveAspectRatio='none'>";
           $lod += "<path d='M0,60C0,60,80,60,80,60C80,60,80,0,80,0C80,0,0,0,0,0C0,0,0,60,0,60'></path>";
           $lod += "<desc>······</desc>";
           $lod += "<defs></defs>";
           $lod += "</svg>";
           $lod += "</div>";
           $lod += "</div>";
           $('body').append($lod);
           setTimeout(function() {
               def.resolve();
           }, 0);

           return def.promise();
       }
       //EndLoadding
       function hideLoadding(){
           $(".loading").remove();
       }

   })

   //Service
    app.service("storageService", function() {
        var me = this;
        me.getKey = function(key) {
            var val = localStorage.getItem(key);
            if (val) return JSON.parse(val);
            else return {};
        }
        me.setKey = function(key, val) {
            if (val) localStorage.setItem(key, JSON.stringify(val));
        }
        me.removeKey = function(key) {
            localStorage.removeItem(key);
        }
        me.groupSet = function(gKey, key, val) {
            var obj = me.getKey(gKey);
            if (!obj) {
                obj = {};
            }

            obj[key] = val;

            me.setKey(gKey, obj);
        }
        me.groupGet = function(gKey, key) {
            var obj = me.getKey(gKey);

            return (obj) ? obj[key] : "";
        }
        me.groupRemove = function(gKey, key) {
            var obj = me.getKey(gKey);
            if (obj && obj[key]) {
                delete obj[key];
                me.setKey(gKey, obj);
            }
        }
    });

    //Service
    app.service("pagingService",function($http, http){
        this.page = function(pageNumber, url, params, success, to){
            params.pageNumber = pageNumber;
            $http.post(http + url, params).success(function(resp) {
                if (resp.status == '200') {
                    success(resp);
                    laypage({
                        cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page"></div>
                        pages: resp.data.totalPage, //通过后台拿到的总页数
                        curr: resp.data.pageNumber, //当前页
                        skin: 'molv', // 皮肤
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                to(obj.curr);
                            }
                        }
                    });
                } else {
                    layer.msg(resp.data);
                }
            }).error(function(resp) {
                layer.msg(errorMsg);
            });
        }

    })
});
