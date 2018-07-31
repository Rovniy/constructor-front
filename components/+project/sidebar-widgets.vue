<template>
  <div id="sidebar-widgets">
    <widget-text/>
    <widget-circle/>
    <widget-image/>
    <widget-text-box/>
  </div>
</template>

<script>
import widgetText from '../widgets/text'
import widgetCircle from '../widgets/circle'
import widgetImage from '../widgets/image'
import widgetTextBox from '../widgets/textbox'

export default {
  name: 'sidebarWidgets',
  components: {
    widgetText,
    widgetCircle,
    widgetImage,
    widgetTextBox
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
