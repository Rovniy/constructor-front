<template>
  <div id="sidebar-widgets">
    <widget-text/>
    <widget-circle/>
  </div>
</template>

<script>
import widgetText from '../widgets/text'
import widgetCircle from '../widgets/circle'
export default {
  name: 'sidebarWidgets',
  components: {
    widgetText,
    widgetCircle
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
