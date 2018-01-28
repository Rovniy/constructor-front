(function () {
    'use strict';

    angular
        .module('uspy')
        .config(config);

    config.$inject = ['$routeProvider'];
    
    function config ($routeProvider) {
        $routeProvider
            .when ('/', {
                templateUrl: '/index/_index.html',
                controller: 'indexController',
                controllerAs: 'vm'
            })
            .when ('/constructor', {
                templateUrl: '/constructor/_constructor.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();