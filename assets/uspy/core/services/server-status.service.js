(function () {
    'use strict';

    angular
        .module('uspy')
        .service('serverStatus', serverStatus);

    serverStatus.$inject = [];

    function serverStatus() {
        this.textStatus = textStatus; //Описание текущего статуса сервера и действия с ним

        /**
         * 0 - сервер не отвечает
         * 1 - соединение установлено
         * 2 - сохранение проекта
         * 3 - ожидание ответа от сервера
         * 4 - сервер выдал ошибку
         * 666 - критическая ошибка сервера. Нужно перезагрузить страницу
         */


        /**
         * Описание текущего статуса сервера и действия с ним
         * @param status - @text - статус работы с сервером
         * @returns {*} - @text - описание статуса
         */
        function textStatus(status) {
            switch (status) {
                case 1:
                    return 'Сервер работает.';
                    break;
                case 0:
                    return 'Соединение с сервером потеряно!';
                    break;
                case 2:
                    return 'Восстанавливаем подключение к серверу...';
                    break;

            }
        }


    }

})();

