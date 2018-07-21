<template>
  <div id="widgetCircle" class="sidebar-widget" @click="addWidget">
    <span v-show="!await">Circle</span>
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
        this.await = true

        const widgetSettings = {
          left: this.$getRandPos() || 0,
          top: this.$getRandPos() || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          radius: this.$getRandSize() || 10
        }

        console.log('config', this.config)

        const settings = Object.assign(this.$store.state.controls, widgetSettings)

        this.$canvas.add(new this.$fabric.Circle(settings))

        this.await = false
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
