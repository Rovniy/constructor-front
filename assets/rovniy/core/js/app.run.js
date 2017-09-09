(function () {
    'use strict';

    angular
        .module('rovniy')
        .run(run);

        run.$inject = ['$rootScope'];

    function run ($rootScope) {
        $rootScope.modules = [];
        $rootScope.settings = [];
        
        $rootScope.activateModule = activateModule;
        
        function activateModule(module) {
            var found = false;
            $rootScope.modules.forEach(function(item){
                if (item.id == module.id) {
                    found = true;
                }
            });

            if (!found) {
                $rootScope.modules.push(module);
            }
        }
    }
})();