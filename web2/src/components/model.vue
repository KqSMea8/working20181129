<style lang="stylus" scoped>
    .modal-mask
        position fixed
        z-index 9998
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(0, 0, 0, .5)
        display table
        transition opacity .3s ease

        .modal-wrapper
            display table-cell
            vertical-align middle
            text-align center

            .modal-container
                display inline-block
                background-color #fff
                box-shadow 0 2px 8px rgba(0, 0, 0, .33)
                transition all .3s ease
                font-family Helvetica, Arial, sans-serif

                .modal-header h3
                    margin-top 0
                    color #42b983

                .modal-body
                    margin 20px 0
                    padding 0 20px
                    text-align left

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>

<template>
    <transition name="model">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">default body</slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">default footer</slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default{
        name: "model",
        data(){
            return {}
        }
    }
</script>