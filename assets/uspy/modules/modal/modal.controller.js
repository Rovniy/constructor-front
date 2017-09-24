(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('modalController', modalController);

    modalController.$inject = ['$rootScope'];

    function modalController($rootScope) {
        var vm = this;
        
        vm.modalClose = modalClose;
        
        activate();
        ///////////////////
        function activate() {
        }        
        
        function modalClose() {
            $rootScope.modalOpen = false;
        }

    }
})();

