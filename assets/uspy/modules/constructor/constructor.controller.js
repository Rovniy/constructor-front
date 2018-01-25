(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = ['$scope','intercomService'];

    function constructorController($scope,intercomService) {
        let vm = this;
        vm.canvasWidth = 400; //дефолтная ширина холста
        vm.canvasHeight = 300; //дефолтнная высота холста

        vm.logThis = logThis;

        activate();
        ///////////////////
        function activate() {
            intercomActivate();

            $scope.$on("drag-ready", function(e,d) { console.log("Drag ready", e,d); });
        }



        /**
         * DEBUG ONLY
         * Вывод информации о событиях Drag & Drop объектов
         * @param message - событие
         * @param draggable - перетаскиваемый объект
         * @param droppable - то, что только что закинули на холст
         * @returns {*}
         */
        function logThis(message, draggable, droppable) {
            return console.log(message, {
                'draggable': draggable,
                'droppable': droppable
            });
        }

        /**
         * Отслеживание событий из Intercom
         */
        function intercomActivate() {

            /**
             * Изменение размеров рабочей области из HEADER
             * header-canvas-create
             */
            intercomService.on('header-canvas-create',function(data){
                vm.canvasWidth = data.sizeX;
                vm.canvasHeight = data.sizeY;
            })
        }
    }
})();