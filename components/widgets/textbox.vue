<template>
  <div id="widgetText" class="sidebar-widget" @click="addWidget">
    <span v-show="!await"><i class="fa fa-font"></i></span>
    <span v-show="await"><i class="fa fa-spin fa-spinner"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetTextBox',
    data() {
      return {
        await: false,
        text: 'Lorem ipsum dolor sit amet,\nconsectetur ' +
            'adipisicing elit,\nsed do eiusmod tempor ' +
            'incididunt\nut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ' +
            'ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods: {
      addWidget() {
        this.$store.commit('awaitStart')

        const widgetSettings = {
          type: 'textbox',
          name: 'TextBox' + this.$store.state.widgetsCounter,
          fontSize: 20,
          left: this.$getRandomInt(0, 400),
          top: this.$getRandomInt(0, 300),
          fontFamily: 'Impact',
          fill: this.$getRandColor(),
          fontWeight: '',
          originX: 'left',
          width: 300,
          hasRotatingPoint: true,
          centerTransform: true
        }

        const settings = Object.assign(...this.$store.state.controls, widgetSettings)

        this.$canvas.add(new this.$fabric.Textbox(this.text.slice(0, this.$getRandomInt(20, this.text.length)), settings))

        this.$canvas.renderAll()
        this.$store.commit('increaseWidgetsCounter')
        this.$store.commit('awaitEnd')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
