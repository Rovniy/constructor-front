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
          left: this.$getRandPos() || 0,
          top: this.$getRandPos() || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          fontFamily: 'Tahoma',
          text: 'Sample text'
        }

        this.$canvas.add(new this.$fabric.Text(config.text, config))

        this.await = false
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
