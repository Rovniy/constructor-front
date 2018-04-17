(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('appController', appController);

    appController.$inject = ['$rootScope','intercomService', 'userProfileService', '$location', 'config'];

    function appController($rootScope, intercomService, userProfileService, $location, config) {
        let app = this;
        app.overlay = false;

        activate();

        ////////////////

        function activate() {
            constructorActivate(); //Включение и отключение отображения оверлея

            _onLogin(); //Событие при входе пользователя
        }

        /**
         * Включение и отключение отображения оверлея
         */
        function constructorActivate() {
            intercomService.on('constructor-on', function () {
                app.overlay = true;
            });
            intercomService.on('constructor-off', function () {
                app.overlay = false;
            });
        }

        /**
         * Событие при входе пользователя
         * @returns {Promise.<TResult>}
         * @private
         */
        function _onLogin() {
            if (!config.debug) {
                userProfileService
                    .loadUserProfile()
                    .then(function () {
                        socketService.webSocketInit();

                        if ($location.url() === '/login') {
                            $location.url('/');
                        }
                    })
                    .catch(function () {
                        $location.url('/login');
                    })
            }
        }
    }

})();