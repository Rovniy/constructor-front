(function () {
    'use strict';

    angular
        .module('uspy')
        .service('userProfileService', userProfileService);

    userProfileService.$inject = ['$http', '$q', 'config'];

    function userProfileService($http, $q, config) {

        let userProfile = undefined; //Профиль пользователя
        let loaderPromise = null; //Обеспечение синглтона

        this.resetUserProfile = resetUserProfile; //Обнуление данных о вошедшем пользователе
        this.loadUserProfile = loadUserProfile; //Загрузка профиля пользователя
        this.reloadUserProfile = reloadUserProfile; //Перезапрос данных пользоватедя
        this.getUserProfile = getUserProfile; //Получение данных пользователя

        /**
         * Загрузка профиля пользователя
         * @returns {angular.IPromise<UserProfile>}
         */
        function loadUserProfile() {
            let user = localStorage.getItem('user');

            if (!loaderPromise) {
                loaderPromise = $http.get(config.apiServer + '/users/' + user)
                    .then(loadUserProfileComplete)
                    .catch(loadUserProfileFailed);
            }

            return loaderPromise;

            function loadUserProfileComplete(response) {
                console.log('SERVICE : loadUserProfile : user login success :', response.data);

                userProfile = response.data.data;
                loaderPromise = $q.when(userProfile);
                return userProfile;
            }

            function loadUserProfileFailed(error) {
                loaderPromise = null;
                console.log('USER-SERVICE : loadUserProfile : user not found');
                return $q.reject(error);
            }
        }

        /**
         * Перезапрос данных пользоватедя
         * @returns {angular.IPromise<UserProfile>}
         */
        function reloadUserProfile() {
            loaderPromise = null;
            return loadUserProfile().then(function (userProfile) {
                return userProfile;
            });
        }

        /**
         * Получение данных пользователя
         * @returns {UserProfile}
         */
        function getUserProfile() {
            return userProfile;
        }

        /**
         * Обнуление данных о вошедшем пользователе
         */
        function resetUserProfile() {
            userProfile = undefined;
            loaderPromise = null;
        }
    }

})();