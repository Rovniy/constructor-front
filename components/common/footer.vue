<template>
  <div id="footer-container">
    <el-row>
      <el-col :span="12">
        mm
      </el-col>
      <el-col :span="12" class="ta-right">
        <p class="copy">Copyright "Rovniy" &copy 2011-2018</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'uspyFooter',
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .copy
    color #C0C4CC

</style>
