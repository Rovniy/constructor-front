<template>
  <div class="canvas-area">
    <canvas id="mainCanvas" v-bind:width='canvasWidth' v-bind:height='canvasHeight'></canvas>
  </div>
</template>

<script>
  import {fabric as Fabric} from 'fabric'

  export default {
    name: 'ID',
    layout: 'constructor',
    components: {
      fabric
    },
    computed: {},
    data() {
      return {
        canvasWidth: '500px',
        canvasHeight: '300px'
      }
    },
    mounted() {

      let canvas = new Fabric.Canvas('mainCanvas',{
        backgroundColor: 'rgb(100,100,200)',
        selectionColor: 'blue',
        selectionLineWidth: 2
      })
      canvas.setWidth(this.canvasWidth)
      canvas.setHeight(this.canvasHeight)
      let rect = new Fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      canvas.add(rect);
      console.log('123123123', canvas)
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
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