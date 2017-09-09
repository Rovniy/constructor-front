(function () {
    'use strict';

    angular
        .module('rovniy')
        .controller('loginController', loginController);

    loginController.$inject = ['$location'];

    function loginController($location) {
        var vm = this;
        vm.login = '';
        vm.password = '';
        vm.error = false;

        vm.loginPost = loginPost;
        
        activate();
        ///////////////////
        function activate() {                       

        }

        /**
         * Login to server
         * @param login - @string - user login
         * @param pass - @string - user password
         */
        function loginPost(login,pass){
            vm.login = '';
            vm.password = '';
            vm.error = false;
            localStorage.removeItem('logx   ');
            if (login !== '' && pass !== '') {
                if (login == '1' && pass == '1'){
                    localStorage.setItem('logx', 'gj');
                    $location.path('/')
                } else {
                    vm.error = true;
                }
            } else {
                vm.error = true;
            }
        }
    }
})();