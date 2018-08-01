<template>
  <div id="widgetCircle" class="sidebar-widget" @click="showModal">
    <span><i class="fa fa-image"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetImage',
    data() {
      return {}
    },
    mounted() {
      this.$root.$on('UPLOADED_IMAGE_READY', data => {
        this.addWidget(data)
      })
    },
    methods: {
      showModal() {
        this.$store.commit('uploader/openModal')
      },
      addWidget(data) {
        this.$store.commit('awaitStart')

        const widgetSettings = {
          type: 'image',
          name: 'Image' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandomInt(0, 500) || 0,
          top: this.$getRandomInt(0, 300) || 0,
          isSelectable: false
        }

        this.$fabric.Image.fromURL(data, img => {
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

  .profile-data-container
    padding: 0

</style>
