<template>
  <div class="canvas-area">
    <controls/>
    <div v-loading="$store.state.await">
      <canvas id="mainCanvas" v-bind:width='$store.state.canvasWidth'
              v-bind:height='$store.state.canvasHeight'></canvas>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import controls from '@/components/+project/controls'

  export default {
    name: 'ID',
    layout: 'constructor',
    components: {
      controls
    },
    data() {
      return {
        canvas: {},
      }
    },
    mounted() {
      this.createCanvas()
    },
    methods: {
      createCanvas() {
        Vue.prototype.$canvas = new this.$fabric.Canvas('mainCanvas', {
          backgroundColor: 'rgb(255,255,255)'
        })
        this.$canvas.renderAll()
        this.$canvas.on('after:render', this.throttleSaveProject)

        /********************************* TEST *******************************/
        const widgetSettings1 = {
          type: 'geometry',
          name: 'Cirlce' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandomInt(0,500) || 0,
          top: this.$getRandomInt(0, 400) || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          radius: this.$getRandomInt(50,200) || 10
        }
        const settings1 = Object.assign(this.$store.state.controls, widgetSettings1)
        this.$canvas.add(new this.$fabric.Circle(settings1))
        this.$store.commit('increaseWidgetsCounter')
        const widgetSettings2 = {
          type: 'text',
          name: 'Text' + this.$store.state.widgetsCounter,
          zindex: this.$store.state.widgetsCounter,
          left: this.$getRandomInt(0,500) || 0,
          top: this.$getRandomInt(0,400) || 0,
          fill: this.$getRandColor() || 'rgb(0,0,0)',
          fontFamily: 'Tahoma',
          text: 'Sample text'
        }
        const settings2 = Object.assign(this.$store.state.controls, widgetSettings2)
        this.$canvas.add(new this.$fabric.Text(settings2.text, settings2))
        this.$store.commit('increaseWidgetsCounter')
        /****************************************************************/


      },
      throttleSaveProject: _.throttle(
        function () {
          this.saveProject()
        }, 5000
      ),
      saveProject() {
        this.$root.$emit('saveProject')
      }
    }
  }
</script>

<style lang="stylus">
  .canvas-area
    display flex
    justify-content center
    align-items center
    height 100%
    min-height 300px
    background-size 10px 10px
    background-color #ffffff
    background-image linear-gradient(to right, #d2d2d2 1px, transparent 1px), linear-gradient(to bottom, #d2d2d2 1px, transparent 1px)

  #mainCanvas
    border 1px dashed #47494e
    background none
    display flex


</style>