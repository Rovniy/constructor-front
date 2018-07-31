<template>
  <div id="widgetCircle" class="sidebar-widget" @click="addWidget">
    <span v-show="!await"><i class="fa fa-circle"></i></span>
    <span v-show="await"><i class="fa fa-spin fa-spinner"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetCircle',
    data() {
      return {
        await: false
      }
    },
    methods: {
      addWidget() {
        this.$store.commit('awaitStart')

        const widgetSettings = {
          type: 'geometry',
          name: 'Cirlce' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandomInt(0, 600) || 0,
          top: this.$getRandomInt(0, 300) || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          radius: this.$getRandomInt(50, 200) || 10
        }

        const settings = Object.assign(this.$store.state.controls, widgetSettings)

        this.$canvas.add(new this.$fabric.Circle(settings))

        this.$canvas.renderAll()
        this.$store.commit('increaseWidgetsCounter')
        this.$store.commit('awaitEnd')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
