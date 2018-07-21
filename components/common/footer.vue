<template>
  <div id="footer-container">
    <el-row>
      <el-col :span="12" class="status-area">
        <span class="app-status">{{ appStatus }}</span>
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
      return {
        appStatus: 'Connected'
      }
    },
    mounted() {
      this.$root.$on('saveProject', () => {
        console.log('event.l')
        this.saveProject()
      })
    },
    methods: {
      saveProject() {
        this.appStatus = 'Saving project...'
        setTimeout(() => {
          this.appStatus = 'Connected'
        },1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .status-area
    display flex
    align-items center
    height 40px
    .app-status
      color #ffffff
      font-size 14px

  .copy
    color #C0C4CC

</style>
