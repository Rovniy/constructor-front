<template>
  <div id="widgetText" class="sidebar-widget" @click="addWidget">
    Text
  </div>
</template>

<script>
  export default {
    name: 'widgetText',
    data() {
      return {

      }
    },
    methods: {
      addWidget() {
        Vue.$emit('addNewWidget',{
          type: 'text',
          data: 'Sample text',
          posX: 0,
          posY: 0
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
