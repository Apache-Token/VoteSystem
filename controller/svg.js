define(['app','layer','css!../custom/css/home/home.css'],function (app, layer, require) {

    var homeDataURL ="data/home.json";
    app.controller('home', function($scope, httpService,pagingService) {

        httpService.get(homeDataURL, function(resp){
            //数据源
            $scope.homeData = resp.homeData.slice(0,4);
        });

    });
    //发生异常错误的时候显示错误信息
    requirejs.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }

        throw err;
    };
});
