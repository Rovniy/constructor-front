<template>
  <div id="custom-api" class="customization-form customization-area">
    <el-button @click="saveProject">Save Project</el-button>
  </div>
</template>

<script>
  export default {
    name: 'customApi',
    data() {
      return {}
    },
    methods: {
      saveProject() {
        let string = JSON.stringify(this.$canvas)
        console.log('Saved JSON', string)
        //TODO send JSON string to server
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
