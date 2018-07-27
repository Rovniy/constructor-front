<template>
  <div id="widgetText" class="sidebar-widget" @click="addWidget">
    <span v-show="!await">Text</span>
    <span v-show="await"><i class="fa fa-spin fa-spinner"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetText',
    data() {
      return {
        await: false
      }
    },
    methods: {
      addWidget() {
        this.$store.commit('awaitStart')

        const widgetSettings = {
          type: 'text',
          name: 'Text' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandPos() || 0,
          top: this.$getRandPos() || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          fontFamily: 'Tahoma',
          text: 'Sample text'
        }

        const settings = Object.assign(...this.$store.state.controls, widgetSettings)

        this.$canvas.add(new this.$fabric.Text(settings.text, settings))

        this.$store.commit('increaseWidgetsCounter')
        this.$store.commit('awaitEnd')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
