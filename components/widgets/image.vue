<template>
  <div id="widgetCircle" class="sidebar-widget" @click="addWidget">
    <span v-show="!await"><i class="fa fa-image"/></span>
      <span v-show="await"><i class="fa fa-spin fa-spinner"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetImage',
    data() {
      return {
        await: false
      }
    },
    methods: {
      addWidget() {
        this.$store.commit('awaitStart')

        const widgetSettings = {
          url: '/images/cat.jpg',
          type: 'image',
          name: 'Image' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandomInt(0, 500) || 0,
          top: this.$getRandomInt(0,300) || 0,
          isSelectable: false
        }

        this.$fabric.Image.fromURL(widgetSettings.url, img => {
          const settings = Object.assign(img, widgetSettings)
          this.$canvas.add(settings)
        })

        this.$canvas.renderAll()
        this.$store.commit('increaseWidgetsCounter')
        this.$store.commit('awaitEnd')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
