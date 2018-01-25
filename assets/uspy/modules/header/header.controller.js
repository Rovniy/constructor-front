(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('headerController', headerController);

    headerController.$inject = ['intercomService'];

    function headerController(intercomService) {
        let vm = this;

        vm.setCanvasSize = setCanvasSize;

        activate();
        ///////////////////
        function activate() {
           
        }

        /**
         * Создание пользовательского холста
         * @param x - ширина хослта
         * @param y - высота холста
         * header-canvas-create
         */
        function setCanvasSize(x,y) {
            intercomService.emit('header-canvas-create',{
                sizeX: x,
                sizeY: y
            });
        }
    }
})();