(function () {
    'use strict';

    angular
        .module('uspy')
        .directive('widgetSomeText', widgetSomeText);

    widgetSomeText.$inject = ['intercomService'];

    function widgetSomeText(intercomService) {
        return {
            restrict: 'EA',
            template:
            '<div ng-click="addWidget()">' +
            '<i class="fa {{widget.icon}} fa-3x ta-center"></i>' +
            '<span class="title" ng-bind="widget.title"></span>' +
            '</div>' +
            '<span class="desc" ng-click="showDescription(widget.desc)">' +
            '<i class="fa fa-question"></i>' +
            '</span>',
            link: function (scope, element, attributes) {
                scope.widget = {
                    title: 'Любой текст',
                    icon: 'fa-font',
                    desc: 'Данный виджет вставляет любой статичный текст на холст'
                };

                scope.addWidget = addWidget;
                scope.showDescription = showDescription;

                function addWidget() {
                    intercomService.emit('widget: add: text', scope.widget);
                }

                /**
                 * Открытие окна с описанием виджета
                 */
                function showDescription() {
                    intercomService.emit('widget: show-description', scope.widget);
                }
            }
        };
    }
})();
