<template>
    <div id="header">
        <div class="row">
            <div class="col-lg-4">
                <div class="pull-left main-menu">
                    <h3>USPY</h3>
                    <ul class="list-inline">
                        <li>
                            <a href="/">Моя библиотека</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 canvas-size">
                <div class="size-input-inline">
                    <span>Рабочая область: <i class="fa fa-vk color-vk"></i></span>
                    <span>Размер:  px</span>
                </div>
            </div>
            <div class="col-lg-5">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'webHeader',
        data() {
            return {
                defaultCanvasWidth: 800,
                defaultCanvasHeight: 300
            }
        },
        methods: {
            setCanvasSize() {
                console.log('resize')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #header {
        height: $header-height;
        position: fixed;
        left: 0;
        top: 0;
        right: $options-width;
        z-index: $z-header;
        background: $panel-color;
        border-bottom: 1px solid $border-light-color;
        box-sizing: content-box;
        .main-menu {
            h3 {
                margin: 0 50px 0 10px;
                font: 18px/$header-height $fm-r;
                float: left;
                color: $color-t;
                text-shadow: $shadow;
            }
            ul {
                float: left;
                padding: 0;
                margin: 0;
                li {
                    a {
                        font: $font-size/$header-height $fm-r;
                        color: $color-semi;
                        text-shadow: $shadow;
                        display: block;
                        margin: 0;
                        padding: 0;
                        transition: .2s ease;
                        &:hover {
                            transition: .2s ease;
                            color: $color-t;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .canvas-size {
            border-left: 1px solid $border-color;
            border-right: 1px solid $border-color;
            span {
                font: $font-size/$header-height $fm-r;
                color: $color-t;
                text-shadow: $shadow;
                margin-right: 10px;
            }
            .fa {
                font-size: 18px;
                text-shadow: $shadow;
            }
        }
    }

</style>