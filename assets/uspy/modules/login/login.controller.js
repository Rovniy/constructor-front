(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('loginController', loginController);

    loginController.$inject = ['$http','config','authenticationService'];

    function loginController($http,config,authenticationService) {
        let vm = this;

        vm.login = login;
        vm.reg = reg;

        activate();
        ///////////////////
        function activate() {

        }

        function login(){
            authenticationService.login(vm.email, vm.password);
        }

        function reg(){
            authenticationService.reg(vm.regLogin, vm.regPass);
        }

    }
})();