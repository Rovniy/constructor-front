<template>
  <div class="canvas-area">
    <controls/>
    <canvas id="mainCanvas" v-bind:width='$store.state.canvasWidth' v-bind:height='$store.state.canvasHeight'></canvas>
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