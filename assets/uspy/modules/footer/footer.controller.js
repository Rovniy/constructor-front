(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('footerController', footerController);

    footerController.$inject = ['config','$http','serverStatus','footerConfig'];

    function footerController(config,$http,serverStatus,footerConfig) {
        let vm = this;
        vm.config = config;
        vm.apiActive = 0; //Начальная установка на соединение с сервером
        vm.serverStatusText = 'Ждем ответа от сервера...';

        activate();
        ///////////////////
        function activate() {
            pingServer(); //Опрос сервера на активность
        }

        /**
         * Опрос сервера на активность
         */
        function pingServer() {

            /**
             * Запрос на активность сервера
             */
            function testServer(){
                //TODO Заменить REST опрос на WebSockets
                $http.get(config.apiServer)
                    .then(function(){
                        vm.apiActive = 1;
                    })
                    .catch(function(){
                        vm.apiActive = 0;
                        xlog('footerController : pingServer : server is busy')
                    })
                    .finally(function(){
                        vm.serverStatusText = serverStatus.textStatus(vm.apiActive);
                        console.log('vm.serverStatusText',vm.serverStatusText);
                    })
            }

            testServer(); //Запрос на активность сервера
            setInterval(function(){
                testServer(); //Запрос на активность сервера
            },footerConfig.pingTimeOut)
        }


    }
})();