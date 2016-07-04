require.config({
    baseUrl: './',
    paths: {
    	'app' : 'assets/angular/app',
        'angular': 'assets/angular/angular',
        'config-routes': 'assets/angular/config-routes',
        'angular-ui-router': 'assets/angular-ui-router/angular-ui-router.min',
        'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min',
        'angular-ui-mask': 'assets/angular-ui-mask/mask.min',
        'ng-tags-input': 'assets/ng-tags-input/ng-tags-input.min',
        'ng-file-upload': 'assets/ng-file-upload/ng-file-upload-all.min',
        'jquery': 'assets/jquery/jquery-2.1.1',
        'layer': 'assets/layer/layer',
        'bootstrap': 'assets/bootstrap/bootstrap-js',
        'css' : 'assets/require/require-css',
        'page-loading': 'assets/page-loading/page-loading',
        'svg': 'assets/svg/svg.min'
    },
    shim: {
    	  'layer' : ['jquery'],
          'bootstrap' : ['jquery'],
    	  'angular-routes' : ['angular'],
          'page-loading' : ['angular'],
          'angular': {exports: 'angular'},
          'angular-ui-router': {deps: ['angular']}
          
    }
});

require(['angular', 'app','config-routes', 'bootstrap','page-loading','svg'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});


