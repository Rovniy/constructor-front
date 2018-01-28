(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('appController', appController);

    appController.$inject = ['intercomService'];

    function appController(intercomService) {
        let app = this;
        app.overlay = false;


        activate();

        ////////////////

        function activate() {
            constructorActivate();
        }

        /**
         * Включение и отключение отображения оверлея
         */
        function constructorActivate() {
            intercomService.on('constructor-on', function(){
                app.overlay = true;
            });
            intercomService.on('constructor-off', function(){
                app.overlay = false;
            });
        }

    }

})();

