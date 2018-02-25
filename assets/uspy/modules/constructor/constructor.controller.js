(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = ['$scope', 'intercomService', '$rootScope', 'widgetDesc', 'fabricFactory', 'fabricConstants'];

    function constructorController($scope, intercomService, $rootScope, widgetDesc, fabricFactory, fabricConstants) {
        let vm = this;
        vm.canvasWidth = 795; //дефолтная ширина холста
        vm.canvasHeight = 200; //дефолтнная высота холста
        vm.canvasStyle = 'width:' + vm.canvasWidth + 'px; height:' + vm.canvasHeight + 'px';
        vm.dictionary = {
            textVk: '<i class="fa fa-vk"></i><span> Вконтакте</span>',
            textYt: '<i class="fa fa-youtube"></i><span> Youtube</span>',
            textTw: '<i class="fa fa-twitch"></i><span> Twitch</span>',
            textOther: '<i class="fa fa-puzzle-piece"></i><span> Основные</span>'
        };

        vm.fabric = {};
        vm.FabricConstants = fabricConstants;


        vm.logThis = logThis;
        vm.openWidgetDescription = openWidgetDescription;

        activate();

        ///////////////////
        function activate() {
            intercomActivate();
            setCanvasSettings();

            $scope.$on("drag-ready", function (e, d) {
                console.log("Drag ready", e, d);
            });
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
            intercomService.on('header-canvas-create', function (data) {
                vm.canvasWidth = data.sizeX;
                vm.canvasHeight = data.sizeY;
            });
            intercomService.emit('constructor-on');
        }

        /**
         * Открытие модального окна с описанием виджета
         * @param widget
         */
        function openWidgetDescription(widget) {
            console.log('открываю модалку', widget);
            /*switch (widget) {
                case 'some-text':
                    break;
                default:
                    break;
            }*/
        }

        function setCanvasSettings() {
            vm.selectCanvas = function() {
                vm.canvasCopy = {
                    width: vm.fabric.canvasOriginalWidth,
                    height: vm.fabric.canvasOriginalHeight
                };
            };
            vm.setCanvasSize = function() {
                vm.fabric.setCanvasSize(vm.canvasCopy.width, vm.canvasCopy.height);
                vm.fabric.setDirty(true);
                delete vm.canvasCopy;
            };
        }

        $rootScope.openWidgetDescription = openWidgetDescription;

    }
})();