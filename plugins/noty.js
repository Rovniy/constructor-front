import Noty from 'noty'
import Vue from 'vue'

const options = {
  layout: 'topRight',
  theme: 'nest',
  timeout: 10000,
  progressBar: true,
  callbacks: {
    beforeShow: function () {
    },
    onShow: function () {
    },
    afterShow: function () {
    },
    onClose: function () {
      console.log('Close some notify')
    },
    afterClose: function () {
    },
    onHover: function () {
    },
    onTemplate: function () {

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
