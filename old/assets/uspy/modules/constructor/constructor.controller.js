(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = ['$rootScope', '$scope', 'intercomService', 'widgetDesc', 'fabricFactory', 'fabricConstants', 'canvasConfig'];

    function constructorController($rootScope, $scope, intercomService, widgetDesc, fabricFactory, fabricConstants, canvasConfig) {
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
        vm.fabricConstants = fabricConstants;
        vm.fabric = {};

        $rootScope.openWidgetDescription = openWidgetDescription;
        vm.logThis = logThis;
        vm.openWidgetDescription = openWidgetDescription;
        vm.intercomActivate = intercomActivate;


        activate();

        ///////////////////
        function activate() {
            $scope.$on("drag-ready", function (e, d) {
                console.log("Drag ready", e, d);
            });
            $scope.$on('canvas:created', canvasInit);
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

            intercomService.emit('constructor-on');

            intercomService.on('widget: add: text', function () {
                vm.fabric.addText();
            });

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

        /**
         * Инициализация канваса
         */
        function canvasInit() {
            vm.fabric = new fabricFactory({
                JSONExportProperties: vm.fabricConstants.JSONExportProperties,
                textDefaults: vm.fabricConstants.textDefaults,
                shapeDefaults: vm.fabricConstants.shapeDefaults,
                json: null
            });
            setCanvasSize(canvasConfig.sizeCollection[0].width, canvasConfig.sizeCollection[0].height);
        }

        /**
         * Изменени размера рабочей области
         * @param width - ширина
         * @param height - высота
         */
        function setCanvasSize(width, height) {
            vm.fabric.setCanvasSize(width, height);
            /**
             * Отображение данных в хедере
             */
            intercomService.emit('canvas-resize-from-create', {
                width: width,
                height: height
            });
        }


    }
})();