<template>
  <div class="canvas-area">
    <controls/>
    <canvas id="mainCanvas" v-bind:width='canvasWidth' v-bind:height='canvasHeight'></canvas>
  </div>
</template>

<script>
  import controls from '@/components/+project/controls'

  export default {
    name: 'ID',
    layout: 'constructor',
    components: {
      controls
    },
    data() {
      return {
        canvasWidth: 700 + 'px',
        canvasHeight: 400 + 'px',
        canvas: {}
      }
    },
    mounted() {
      this.createCanvas()
      this.initMethods()
    },
    methods: {
      initMethods() {
        this.actionAddWidget()
        this.actionRemoveWIdget()
        this.actionClearCanvas()
      },
      createCanvas() {
        this.canvas = new this.$fabric.Canvas('mainCanvas')
      },
      actionAddWidget() {
        this.$root.$on('addNewWidget', data => {
          this.canvas.add(data)
        })
      },
      actionRemoveWIdget() {
        this.$root.$on('deleteWidget', () => {
          let group = this.canvas.getActiveObjects()
          group.forEach(widget => {
            this.canvas.remove(widget)
          })
          this.canvas.discardActiveObject()
        })
      },
      actionClearCanvas() {
        this.$root.$on('clearCanvas', () => {
          this.canvas.clear()
        })

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

  #mainCanvas
    border 1px dashed #47494e
    background #fff
    display flex


</style>