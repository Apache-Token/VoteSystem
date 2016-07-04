/**
 * Created by meibei-two on 2016.07.01.
 */
define(['app','layer','css!../custom/css/book/book.css'],function (app, layer, require) {

    var homeDataURL ="data/home.json";
    app.controller('book', function($scope, httpService) {



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

