(function () {
    'use strict';

    angular.module('uspy')
        .controller('headerController', headerController);

    headerController.$inject = ['$rootScope','$scope','$window'];

    function headerController($rootScope,$scope,$window) {
        var vm = this;
        
        vm.modalOpen = modalOpen;

        activate();
        /////////////////////
        function activate() {
            scroll();
        }

        /**
         * Отслеживание прокрутки скролла документа
         */
        function scroll() {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset > 0) {
                    vm.moved = true;
                } else {
                    vm.moved = false;
                }
                $scope.$apply();
            });
        }

        function modalOpen() {
            $rootScope.modalOpen = true;
        }

    }
})();

