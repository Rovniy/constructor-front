<template>
    <div class="app">
        <webHeader/>
        <nuxt/>
        <webFooter/>
    </div>
</template>

<script>
  import webHeader from '@/components/common/header'
  import webFooter from '@/components/common/footer'

  export default {
    components: {
        webHeader, webFooter
    }
  }
</script>
