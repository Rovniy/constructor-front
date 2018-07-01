<template>
  <el-container class="app">
    <el-header id="header">
      <uspyHeader/>
    </el-header>
    <el-main id="main">
      <nuxt/>
    </el-main>
    <el-footer height="40px" id="footer">
      <uspyFooter/>
    </el-footer>
  </el-container>
</template>

<script>
  import uspyHeader from '@/components/common/header'
  import uspyFooter from '@/components/common/footer'
  export default {
    components: {
      uspyHeader, uspyFooter
    }
  }
</script>

<style lang="stylus">
  .app
    height 100%
    .el-header
      background #545c64
    .el-footer
      background #545c64
</style>
