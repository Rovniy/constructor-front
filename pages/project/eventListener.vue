<script>
  export default {
    name: 'eventListener',
    data() {
      return {}
    },
    created() {
      Vue.$on('addNewWidget', data => {

      })
    }
  }
</script>
