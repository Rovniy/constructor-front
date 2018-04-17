/**
 * // TODO
 * Нужно переписать логику авторизации во vuex подходе, вынести методы в actions.
 * Не понятно зачем нужна авторизация через плагин, по всей видимости именно поэтому apiapi они и хранили в свойстве
 * глобального обьекта Vue, чтобы обращаться Vue.ApiClient из плагинов.
 * Короче помоему это не нужно. В плагинах должно лежать то что мы используем часто и на вссех страницах.
 */

import Vue from 'vue';

/**
 * [Plugins.Auth]
 * Description: Provide all methods for user authentication
 */
export default {
    init({router}) {
        this._router = router;
        return this
    },

    /**
     * Register user
     * @returns {Promise}
     */
    registration(username, password) {
        return Vue.apiClient.register({
            'username': username,
            'password': password
        }).then(res => {
            if (res) {
                this.login(username, password)
                //TODO
            }
            return res
        })
    },

    /**
     * Login with Username and Password
     * @returns {Promise}
     */
    login(username, password) {
        return Vue.apiClient.auth({
            'username': username,
            'password': password
        }).then(res => {
            if (res && res.token) {
                this.setToken(res.token)
                //TODO
            }
            return res
        })
    },

    /**
     * Set Token in localStorage
     * @param token
     */
    setToken(token) {
        this._token = token;
        localStorage.setItem(process.env.KEY_TOKEN, this._token)
    },

    /**
     * Logout
     */
    logout() {
        this._token = null;
        localStorage.removeItem(process.env.KEY_TOKEN)
    },

    /**
     * Get token from localStorage
     */
    getToken() {
        if (!this._token) {
            this._token = localStorage.getItem(process.env.KEY_TOKEN)
        }
        return this._token
    },


    /**
     * Аутентифицирован ли пользователь
     */
    isAuth() {
        return !!this.getToken()
    },

    /**
     * Обновление авторизации
     */
    refreshAuth() {
        return Vue.apiClient.refreshToken({token: this.getToken()}).then(res => {
            if (res && res.token) {
                this.setToken(res.token)
            }
        })
    }
}
