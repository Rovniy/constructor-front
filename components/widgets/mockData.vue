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
        this.$store.commit('awaitStart')

        this.$axios.get('http://5b5279ded9b92700141c9925.mockapi.io/User')
            .then(response => {
              const widgetSettings = {
                type: 'group',
                name: 'VKwidget' + this.$store.state.widgetsCounter,
                zindex: this.$store.state.widgetsCounter,
                text: response ? response[this.$getRandomInt(0, 10)].name : 'Some name',
                left: this.$getRandomInt(0,500),
                top: this.$getRandomInt(0, 400),
                fill: this.$getRandColor(),
                fontFamily: 'Tahoma'
              }

              const settings = Object.assign(this.$store.state.controls, widgetSettings)

              this.$canvas.add(new this.$fabric.Text(settings.text, settings))

              this.$canvas.renderAll()
              this.$store.commit('increaseWidgetsCounter')
              this.$store.commit('awaitEnd')
            })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
