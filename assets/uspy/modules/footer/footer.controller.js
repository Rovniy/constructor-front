(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('footerController', footerController);

    footerController.$inject = ['config','$scope','serverStatus','footerConfig','socketService','intercomService','$timeout'];

    function footerController(config,$scope,serverStatus,footerConfig,socketService,intercomService,$timeout) {
        let vm = this;
        vm.config = config;
        vm.apiActive = 0; //Начальная установка на соединение с сервером
        vm.serverStatusText = 'Ждем ответа от сервера...';

        activate();
        ///////////////////
        function activate() {
            pingServer(); //Опрос сервера на активность

            $scope.$on('PING',function(data){
                $timeout(function(){
                    vm.apiActive = 1;
                    vm.serverStatusText = serverStatus.textStatus(vm.apiActive);
                })

            });

            intercomService.on('WS_CONNECTION_LOSS',function(){
                $timeout(function(){
                    vm.apiActive = 0;
                    vm.serverStatusText = serverStatus.textStatus(vm.apiActive);
                })
            });

            intercomService.on('WS_RECONNECT',function(){
                $timeout(function(){
                    vm.apiActive = 2;
                    vm.serverStatusText = serverStatus.textStatus(vm.apiActive);
                })
            });


        }

        /**
         * Опрос сервера на активность
         */
        function pingServer() {

            /**
             * Запрос на активность сервера
             */
            function testServer(){
                socketService.sendMessage({
                    message_type: 'PING'
                });
            }

            if (socketService.isOpened()) {
                testServer(); //Запрос на активность сервера
            }

            setInterval(function(){
                if (socketService.isOpened()) {
                    testServer(); //Запрос на активность сервера
                }
            },footerConfig.pingTimeOut)
        }


    }
})();