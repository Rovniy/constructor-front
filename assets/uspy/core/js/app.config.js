(function () {
    'use strict';

    angular
        .module('uspy', [
            'ngRoute',
            'ngSanitize',
            'ngCookies',
            'laneolson.ui.dragdrop'
        ])
        .constant('config', {
            version: '0.0.1', //Текущая версия сайта
            template: 'uspy', //Шаблон сайта
            theme: 'default', //Тема сайта
            mainUrl: window.location.protocol+ '//' + window.location.host,
            copy: 'Uspy &copy &year',
            debug: window.location.host === 'uspy.local:9360'
        })
        .config(config);

    config.$inject = ['$locationProvider'];

    function config ($locationProvider) {
        $locationProvider.html5Mode(true);
    }

})();