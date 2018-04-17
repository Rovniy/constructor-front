/**
 * [Plugins.Noty]
 * Description: Show some message text in custom style
 * Source: https://www.npmjs.com/package/noty
 */

import Noty from 'noty'
import Vue from 'vue'

const options = {
    layout: 'topRight',
    theme: 'nest',
    timeout: 10000,
    progressBar: true,
    callbacks: {
        beforeShow: function() {},
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {
            console.log('Close some notify')
        },
        afterClose: function() {},
        onHover: function() {},
        onTemplate: function() {
            //this.barDom.innerHTML = '<div class="my-custom-template noty_body">' + this.options.text + '<div>';
            // Important: .noty_body class is required for setText API method.
        }

    }
}

Vue.use({
    install: (Vue, opts) => {
        Vue.prototype.$noty = function (data) {
            console.log('123123')
            return new Noty(Object.assign(options, opts, data)).show()
        };
    }
})
