(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('appController', appController);

    appController.$inject = ['$rootScope'];

    function appController($rootScope) {
        let app = this;


        activate();

        ////////////////

        function activate() {
            console.log('$rootScope',$rootScope)
                        
        }

    }

})();

