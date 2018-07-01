<template>
  <div id="header-container">
    <el-row>
      <el-col :span="3">
        <h3 id="logo">
          <nuxt-link to="/">USPY</nuxt-link>
        </h3>
      </el-col>
      <el-col :span="12">
        <el-menu background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 mode="horizontal"
                 :router="true"
                 :default-active="$route.path">
          <el-menu-item index="/">
            Homepage
          </el-menu-item>
          <el-menu-item index="/dashboard">
            Dashboard
          </el-menu-item>
          <el-menu-item index="/project/1">
            Project
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="9" class="ta-right user-area">
        <el-button-group>
          <el-button type="primary">Login</el-button>
          <el-button type="info">Sign in</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'uspyHeader',
    data() {
      return {
        activeIndex: '3',
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #logo
    line-height 60px
    color #ffffff
    vertical-align middle
    padding 0
    margin 0
    a
      color #ffffff
      text-decoration: none
      &:hover
        text-decoration: none

  .user-area
    line-height: 60px


</style>