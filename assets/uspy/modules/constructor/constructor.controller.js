(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = [];

    function constructorController() {
        var vm = this;
        vm.active = 1;

        activate();
        ///////////////////
        function activate() {
           
        }
    }
})();