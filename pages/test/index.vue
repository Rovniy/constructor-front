<template>
    <div class="test">
        <button class="btn btn-lg btn-warning" @click="noty">Вызвать ошибку</button>
    </div>

</template>

<script>
    export default {
        methods: {
            noty() {
                this.$noty({
                    type: 'error',  // alert, success, warning, error, info/information
                    text: '123123123'
                })
            }
        }

    }
</script>

<style>

</style>