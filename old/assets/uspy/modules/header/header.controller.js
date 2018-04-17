(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('headerController', headerController);

    headerController.$inject = ['intercomService','headerConfig'];

    function headerController(intercomService,headerConfig) {
        let vm = this;
        vm.config = headerConfig;

        activate();
        ///////////////////
        function activate() {
            setCanvasSize();
        }

        /**
         * Создание пользовательского холста
         * @param x - ширина хослта
         * @param y - высота холста
         * header-canvas-create
         */
        function setCanvasSize() {
            intercomService.on('canvas-resize-from-create',function(data){
                vm.config.defaultCanvasWidth = data.width;
                vm.config.defaultCanvasHeight = data.height;
            });
        }
    }
})();