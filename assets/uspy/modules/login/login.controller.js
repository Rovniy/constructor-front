(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('loginController', loginController);

    loginController.$inject = ['$timeout','config','authenticationService'];

    function loginController($timeout,config,authenticationService) {
        let vm = this;
        /**
         * 1 - чувак входил и мы знаем его почту
         * 2 - чувак впервые входит
         * 3 - ввод пароля
         * 4 - страница входа
         */
        vm.page = 1;

        vm.login = login;
        vm.reg = reg;
        vm.switchPage = switchPage;
        vm.goToFirst = goToFirst;

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

        /**
         * Смена страницы окна
         * @param page
         */
        function switchPage(page) {
            $timeout(function(){
                vm.page = page;
            })
        }

        /**
         * Переход на страниц ввода логина и пароля
         */
        function goToFirst() {
            $timeout(function(){
                vm.page = 2;
            })
        }



    }
})();