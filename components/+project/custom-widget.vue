<template>
  <div id="custom-canvas" class="customization-form customization-area">
    Custom widget
  </div>
</template>

<script>
  export default {
    name: 'customWidget',
    data() {
      return {}
    },
    methods: {
      deleteWidget() {
        this.$root.$emit('deleteWidget')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
