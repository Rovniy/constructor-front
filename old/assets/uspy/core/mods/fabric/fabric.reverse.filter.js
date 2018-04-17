(function () {
    'use strict';

    angular
        .module('uspy')
        .filter('reverse', [function () {
            return function (items) {
                if (items) {
                    return items.slice().reverse();
                }
            };
        }])
})();
