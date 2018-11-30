<style lang="stylus">
    @import './common/styl/common.styl'
    @import './common/styl/variables.styl'
    .content
        min-width 1560px
        background #fff
        // box-shadow 0 0 3px #f1f5fa
        margin 0 auto
        // margin-top 12px
        // width $width
        position absolute
        top 0px
        right 0
        bottom 0
        left 0
        // overflow hidden

</style>

<template>
    <div class="main">
        <div class="content clearfix">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {
        },
        mounted: function () {
        }
    }
</script>