<template>
    <div class="app">
        <webHeader/>
        <nuxt/>
        <webFooter/>
        <h1>Const</h1>
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
