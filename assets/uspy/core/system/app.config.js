(function () {
    'use strict';

    angular
        .module('uspy', [
            'ngRoute',
            'ngSanitize',
            'ngCookies',
            'ui.bootstrap',
            'AccordionModule'
        ])
        .constant('config', {
            version: '0.0.1', //Текущая версия сайта
            template: 'uspy', //Шаблон сайта
            theme: 'default', //Тема сайта
            mainUrl: window.location.protocol+ '//' + window.location.host,
            copy: 'Uspy &copy &year',
            debug: window.location.host === 'uspy.local:9360',
            apiServer: 'http://localhost:3000'
        })
        .config(config);

    config.$inject = ['$locationProvider'];

    function config ($locationProvider) {
        $locationProvider.html5Mode(true);
    }

})();