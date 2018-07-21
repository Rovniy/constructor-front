<template>
  <el-container class="app">
    <el-header id="header">
      <uspyHeader/>
    </el-header>
    <el-container>
      <el-aside>
        <uspyAside/>
      </el-aside>
      <el-main id="main">
        <nuxt/>
      </el-main>
    </el-container>
    <el-footer height="40px" id="footer">
      <uspyFooter/>
    </el-footer>
  </el-container>
</template>

<script>
  import uspyHeader from '@/components/common/header'
  import uspyFooter from '@/components/common/footer'
  import uspyAside from '@/components/common/aside'

  export default {
    components: {
      uspyHeader, uspyFooter, uspyAside
    }
  }
</script>

<style lang="stylus">
  .app
    height 100%
    overflow hidden
    .el-header
      background #545c64
    .el-footer
      background #545c64
    .el-aside
      background #fff
      border-right 1px solid #e6e6e6
    #main
      position relative
</style>
