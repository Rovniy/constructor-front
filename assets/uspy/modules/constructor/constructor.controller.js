(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('constructorController', constructorController);

    constructorController.$inject = ['$scope'];

    function constructorController($scope) {
        var vm = this;

        $scope.$on("drag-ready", function(e,d) { console.log("Drag ready", e,d); });

        $scope.logThis = function(message, draggable, droppable) {
            return console.log(message, {
                'draggable': draggable,
                'droppable': droppable
            });
        };

        activate();
        ///////////////////
        function activate() {
           
        }
    }
})();