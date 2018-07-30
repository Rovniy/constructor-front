import {fabric as Fabric} from 'fabric'
import Vue from 'vue'

//Create random position for created widget
const getRandPos = function () {
  return Math.round(Math.random(1, 200) * 100)
}

//Create random color for created widget
const getRandColor = function () {
  let rand = Math.round(Math.random(0, 3) * 10)
  if (rand < 3) {
    return '#FF0606'
  } else if (rand > 3 && rand < 6) {
    return '#007BFF'
  } else if (rand > 6) {
    return '#000000'
  }
}

//Create random size for created widget
const getRandSize = function () {
  return Math.round(Math.random(1, 200) * 50)
}

Vue.use({
  install(Vue) {
    Vue.prototype.$fabric = Fabric
    Vue.prototype.$getRandPos = getRandPos
    Vue.prototype.$getRandColor = getRandColor
    Vue.prototype.$getRandSize = getRandSize
  }
})

export default Fabric
