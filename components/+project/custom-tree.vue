<template>
  <div id="custom-canvas" class="customization-form">
    Custom canvas
  </div>
</template>

<script>
  export default {
    name: 'customTree',
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
