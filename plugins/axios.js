import axios from 'axios'
import Vue from 'vue'

const Axios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/' || process.env.API_URL,
  timeout: 60000
})

Axios.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 304) {
    return response.data
  }

  return response
})

Vue.use({
  install(Vue) {
    Vue.prototype.$axios = Axios
  }
})

export default Axios
