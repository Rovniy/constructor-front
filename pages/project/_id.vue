<template>
  <div class="canvas-area">
    <canvas id="mainCanvas" v-bind:width='canvasWidth' v-bind:height='canvasHeight'></canvas>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import eventListener from './eventListener'

  export default {
    name: 'ID',
    layout: 'constructor',
    components: {
      fabric
    },
    computed: {},
    data() {
      return {
        canvasWidth: '700px',
        canvasHeight: '300px'
      }
    },
    mounted() {

      const canvasEl = document.getElementById('mainCanvas')
      const ctx = canvasEl.getContext('2d');
      ctx.fillStyle = 'red';

      let canvas = new fabric.Canvas('c', {
        isDrawingMode: true
      });

      // create a rectangle object
      let rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });

// "add" rectangle onto canvas
      canvas.add(rect);
      console.log('canvasEl',canvasEl,'ctx',ctx,'canvas',canvas,'rect',rect)

      /*const canvas = new fabric.Canvas('c',{
        backgroundColor: 'rgb(100,200,255)',
        selectionColor: 'blue',
        selectionLineWidth: 2
      })
      canvas.setWidth(this.canvasWidth)
      canvas.setHeight(this.canvasHeight)
      let triangle = new fabric.Triangle({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
      });
      canvas.add(triangle);
      console.log('123123123', canvas)*/
    },
    methods: {
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