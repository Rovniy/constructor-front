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

        const config = {
          left: this.$getRandPos(),
          top: this.$getRandPos(),
          fill: this.$getRandColor(),
          radius: this.$getRandSize()
        }

        let widget = new this.$fabric.Circle(config)

        this.$root.$emit('addNewWidget', widget)

        this.await = false
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
