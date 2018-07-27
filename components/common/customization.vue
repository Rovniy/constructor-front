<template>
  <div id="aside-container">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="canvas">
        <span slot="label"><i class="fa fa-cog"></i></span>
        <custom-canvas/>
      </el-tab-pane>
      <el-tab-pane name="widget">
        <span slot="label"><i class="fa fa-wrench"></i></span>
        <custom-widget/>
      </el-tab-pane>
      <el-tab-pane name="tree">
        <span slot="label"><i class="fa fa-stream"></i></span>
        <custom-tree/>
      </el-tab-pane>
      <el-tab-pane name="api">
        <span slot="label"><i class="fa fa-cloud-upload-alt"></i></span>
        <custom-api/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import customCanvas from '../+project/custom-canvas'
  import customWidget from '../+project/custom-widget'
  import customTree from '../+project/custom-tree'
  import customApi from '../+project/custom-api'

  export default {
    name: 'uspyCustomization',
    components: {
      customCanvas,
      customWidget,
      customTree,
      customApi
    },
    data() {
      return {
        activeName: 'canvas'
      }
    },
    mounted() {
      //TODO create logic
      /*this.$canvas.on({
        'selection:created': () => {
          this.activeName = 'widget'
        },
        'selection:cleared': () => {
          this.activeName = 'canvas'
        }
      })*/
    }
  }
</script>

<style lang="stylus" scoped>
  .el-menu
    border-right none

  .el-tabs
    .el-tabs__content
      padding: 10px


</style>
