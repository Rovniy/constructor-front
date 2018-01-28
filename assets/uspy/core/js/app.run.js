(function () {
    'use strict';

    angular
        .module('uspy')
        .run(run);

        run.$inject = ['$rootScope','$timeout','socketService'];

    function run ($rootScope,$timeout,socketService) {

        socketService.webSocketInit();

        socketService.addHandler(function (m) {
            // $timeout для запуска $digest
            $timeout(function () {
                $rootScope.$broadcast(m.message_type, m);
            });
        });

    }
})();