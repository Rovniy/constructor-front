(function () {
    'use strict';

    angular
        .module('uspy')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'intercomService','config'];

    /**
     * 
     * @param $http
     * @param {intercomService} intercomService
     */
    function authenticationService($http, intercomService,config) {
        this.logout = logout;
        this.login = login;
        this.reg = reg;

        ////////////////

        function logout() {
            return $http
                .get('/api/logout')
                .then(function () {
                    intercomService.emit('authentication.logout');
                });
        }

        function login(email, password) {
            let data =  {
                email: email,
                password: password
            };
            return $http
                .post(config.apiServer + '/login', data)
                .then(function (response) {
                    intercomService.emit('authentication.login');
                });
        }

        function reg(email, password){
            let data = {
                login: email,
                password: password
            };
            $http.post(config.apiServer + '/reg', data)
        }
    }

})();

