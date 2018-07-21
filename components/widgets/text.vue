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
        this.await = true

        const config = {
          left: this.$getRandPos(),
          top: this.$getRandPos(),
          fill: this.$getRandColor(),
          fontFamily: 'Tahoma'
        }

        let widget = new this.$fabric.Text('Sample text', config)

        this.$root.$emit('addNewWidget', widget)

        this.await = false
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
