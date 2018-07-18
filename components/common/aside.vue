<template>
  <div id="aside-container">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-news"></i>Widgets</template>
        <sidebar-widgets/>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Twitch</template>
        <sidebar-widgets-twitch/>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-view"></i>Vkontakte</template>
        <sidebar-widgets-vkontakte/>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import sidebarWidgets from '../+project/sidebar-widgets'
  import sidebarWidgetsVkontakte from '../+project/sidebar-vkontakte'
  import sidebarWidgetsTwitch from '../+project/sidebar-twitch'

  export default {
    name: 'uspyAside',
    components: {
      sidebarWidgets,
      sidebarWidgetsVkontakte,
      sidebarWidgetsTwitch
    },
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
