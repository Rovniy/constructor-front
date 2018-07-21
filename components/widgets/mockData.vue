<template>
  <div id="widgetText" class="sidebar-widget" @click="addWidget">
    <span v-show="!await">Mock data</span>
    <span v-show="await"><i class="fa fa-spin fa-spinner"/></span>
  </div>
</template>

<script>
  export default {
    name: 'widgetMockData',
    data() {
      return {
        await: false
      }
    },
    methods: {
      addWidget() {
        this.await = true

        this.$axios.get('http://5b5279ded9b92700141c9925.mockapi.io/User')
            .then(res => {
              const config = {
                text: res[this.$fabric.util.getRandomInt(0,50)].name,
                left: this.$getRandPos(),
                top: this.$getRandPos(),
                fill: this.$getRandColor(),
                fontFamily: 'Tahoma'
              }

              let widget = new this.$fabric.Text(config.text, config)

              this.$root.$emit('addNewWidget', widget)

              this.await = false
            })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
