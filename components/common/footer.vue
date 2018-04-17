<template>
    <div id="footer">
        <div class="pull-left online-indicator"></div>
        <div class="pull-left indicator-text">
            <span>{{serverStatusText}}</span>
        </div>
        <div class="pull-right secondary-menu">
            <span class="color-semi">version {{version}}</span><span color="color-border"> |</span><span
                class="color-white"> USPY © 2018 All rights reserved</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'webFooter',
        data() {
            return {
                pingTimeOut: 1000,
                apiActive: 0,
                version: '0.0.1',
                serverStatusText: 'Ждем ответа от сервера...'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #footer
        height $footer-height
        position fixed
        left 0
        bottom 0
        right 0
        z-index $z-header
        background $panel-color
        border-top 1px solid $border-color
        box-sizing content-box
        .secondary-menu
            padding 0 10px 0 0
            span
                font $font-size/$footer-height $fm-r
                text-shadow $shadow
        .online-indicator
            width 3px
            margin 0
            padding 0
            height $footer-height
            &.active
                background $color-green-active
            &.no-active
                background $color-green-no-active
            &.reconnect
                background $color-orange-reconnect
        .indicator-text
            margin 0 0 0 5px
            span
                display block
                font $font-size/$footer-height $fm-r
                color $color-semi
                text-shadow $shadow

</style>
