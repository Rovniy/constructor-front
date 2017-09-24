(function () {
    'use strict';

    angular
        .module('uspy')
        .controller('indexController', indexController);

    indexController.$inject = ['$rootScope'];

    function indexController($rootScope) {
        var vm = this;
        vm.active = 1;
        vm.social = [
            {
                blockClass: 'youtube',
                index: 1,
                icon: 'fa-youtube-play',
                text: 'YouTube'
            },
            {
                blockClass: 'vk',
                index: 2,
                icon: 'fa-vk',
                text: 'Vkontakte'
            },
            {
                blockClass: 'twitch',
                index: 3,
                icon: 'fa-twitch',
                text: 'Twitch'
            },
            {
                blockClass: 'fb',
                index: 4,
                icon: 'fa-facebook',
                text: 'Facebook'
            },
            {
                blockClass: 'ok',
                index: 5,
                icon: 'fa-odnoklassniki',
                text: 'OK'
            }
        ];
        
        vm.modalOpen = modalOpen;


        activate();
        ///////////////////
        function activate() {
           
        }
        
        function modalOpen() {
            $rootScope.modalOpen = true;
        }
    }
})();