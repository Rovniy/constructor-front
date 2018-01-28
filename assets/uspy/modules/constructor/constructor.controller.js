(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = ['$scope','intercomService'];

    function constructorController($scope,intercomService) {
        let vm = this;
        vm.canvasWidth = 795; //дефолтная ширина холста
        vm.canvasHeight = 200; //дефолтнная высота холста
        vm.canvasStyle = 'width:' + vm.canvasWidth + 'px; height:' + vm.canvasHeight + 'px';

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


        vm.textVk = '<i class="fa fa-vk"></i><span> Вконтакте</span>';
        vm.textYt = '<i class="fa fa-youtube"></i><span> Youtube</span>';
        vm.textTw = '<i class="fa fa-twitch"></i><span> Twitch</span>';
    }
})();