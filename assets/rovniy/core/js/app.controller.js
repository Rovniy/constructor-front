(function () {
    'use strict';

    angular
        .module('rovniy')
        .controller('appController', appController);

    appController.$inject = ['$rootScope'];

    function appController($rootScope) {
        var app = this;
        

        activate();

        ////////////////

        function activate() {
            $rootScope.backgroundImg = '/src/img/bg/1.jpg';
            
        }

    }

})();

