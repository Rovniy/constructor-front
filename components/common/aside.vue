<template>
  <div id="aside-container">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-news"></i>Layout</template>
        <p>Some layout config</p>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Widgets</template>
        <p>Some widgets</p>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-view"></i>Item config</template>
        <p>Some config</p>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'uspyAside',
    data() {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-menu
    border-right none


</style>
