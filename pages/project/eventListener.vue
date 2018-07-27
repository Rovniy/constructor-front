<script>
  export default {
    name: 'eventListener',
    data() {
      return {}
    },
    created() {
      Vue.$on('addNewWidget', data => {
        console.log('EVENTLISTENER : addNewWidget :', data)
      })
    }
  }
</script>
