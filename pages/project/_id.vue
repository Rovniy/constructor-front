<template>
  <div>
    MAIN
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
      return {}
    },
    mounted() {
      console.log('123123123', Fabric)
      let canvas = new Fabric.Canvas('c')
      let rect = new Fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      canvas.add(rect);
    },
    methods: {
      console() {
        this.$noty({
          type: 'error',
          timeout: '1111',
          text: 'вет '
        })
      }
    }
  }
</script>

<style scoped>


</style>