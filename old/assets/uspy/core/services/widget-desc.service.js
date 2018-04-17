(function () {
    'use strict';

    angular
        .module('uspy')
        .service('widgetDesc', widgetDesc);

    widgetDesc.$inject = ['intercomService'];

    function widgetDesc(intercomService) {

        /**
         * data:
         * @string param : desc - описание виджета для отображения
         * @string param : title - название виджета
         */
        intercomService.on('widget: show-description',function(data){
            console.log('Service',data);
            //TODO развертывание окна с описанием виджета
        });

    }

})();



