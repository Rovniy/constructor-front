<template>
  <div id="controls">
    <el-button type="danger" size="mini" @click="clearCanvas"><i class="fa fa-paperclip"/> Reset canvas</el-button>
    <el-button type="danger" size="mini" @click="deleteWidget"><i class="fa fa-trash"/> Delete widget</el-button>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    data() {
      return {}
    },
    methods: {
      deleteWidget() {
        this.$root.$emit('deleteWidget')
      },
      clearCanvas() {
        this.$root.$emit('clearCanvas')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #controls
    width 100%
    height 40px
    position absolute
    top 0
    left 0
    right 0
    background #000000
    align-items center
    justify-content center
    display flex
    padding 0 6px

</style>
