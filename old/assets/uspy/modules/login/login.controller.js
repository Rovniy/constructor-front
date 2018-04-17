(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('loginController', loginController);

    loginController.$inject = ['$timeout','$scope','authenticationService'];

    function loginController($timeout,$scope,authenticationService) {
        let vm = this;
        /**
         * 1 - чувак входил и мы знаем его почту
         * 2 - чувак впервые входит
         * 3 - ввод пароля
         * 4 - страница входа
         */
        vm.page = 1;
        vm.debounce = 1000; //задержка перед изменением модели

        vm.login = login;
        vm.registration = registration;
        vm.switchPage = switchPage;
        vm.goToFirst = goToFirst;
        vm.activePage = activePage;

        activate();
        ///////////////////
        function activate() {

        }

        /********************************** ВХОД НА САЙТ ********************************/

        function login(){
            authenticationService.login(vm.email, vm.password);
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

        /**
         * Добавление класса к кнопкам
         * @param button
         * @returns {boolean}
         */
        function activePage(button){
            if (button === 'enter') {
                if (vm.page === 1 || vm.page === 2 || vm.page === 3) {
                    return true;
                }
            } else if (button === 'reg') {
                if (vm.page === 4 || vm.page === 5 || vm.page === 6) {
                    return true;
                }
            }
        }

        /********************************** РЕГИСТРАЦИЯ ********************************/

        function registration(){
            authenticationService.reg(vm.regLogin, vm.regPass);
        }

    }
})();