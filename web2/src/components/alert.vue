<style lang="stylus" scoped>
    .al-header
        height 40px
        line-height 40px
        text-align left
        background white
        color #333
        border-top-left-radius 4px
        border-top-right-radius 4px
        border-bottom: 1px solid #E5E5E5;
        padding-left: 15px;

        .al-title
            line-height 40px
            font-weight bold
            font-size 16px

        .al-close
            color: #fff
            font-size 20px
            margin-top 4px
            cursor: pointer
            float right


    .al-body
        width 320px
        min-height 50px

        .al-BTitle
            line-height 30px
            font-size 14px
            font-weight bold

        .al-Bcontent
            line-height 24px
            font-size 14px
            text-align center
            padding-top 15px

    .al-footer
        text-align center
        margin 20px 0 16px 0

        .al-Bbutton
            width: 80px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            display: inline-block;
            margin: 0 20px;
            border: 1px solid #DDDDDD;
            font-size: 14px
        .hrc-btn-submit
            background: #4FA2FE;
            color: #fff;
            border-color: #4FA2FE;
            
</style>

<template>
    <model class="al-conrain" v-show="isShow">
        <div slot="header" class="al-header">
            <!-- <div class="al-logo"></div> -->
            <span class="al-title" v-text="headTitle"></span>
            <div class="al-close" @click="closeBox"></div>
        </div>
        <div slot="body" class="al-body">
            <div class="al-BTitle" v-text="bodyTitle"></div>
            <div class="al-Bcontent" v-text="bodyContent"></div>
        </div>
        <div slot="footer" class="al-footer">
            <span class="al-Bbutton hrc-btn-cancel al-Bbutton-hover" @click="closeBox">取消</span>
            <span class="al-Bbutton hrc-btn-submit" @click="confirmCallback">确定</span>
        </div>
    </model>
</template>

<script>
    import Model from "./Model.vue";
    export default{
        name: "alert",
        components: {
            Model
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            headTitle: {
                type: String,
                default: '温馨提示'
            },
            bodyTitle: {
                type: String,
                default: ''
            },
            bodyContent: {
                type: String,
                default: '请输入需要提示的内容'
            },
            close: {
                type: Function,
                default: function () {
                    //console.log("vvvvv");
                }
            },
            alertFn: {
                type: Function,
                default: function () {
                }
            }
        },
        data(){
            return {}
        },
        mounted: function () {
        },
        methods: {
            closeBox: function () {
                this.close();
            },
            confirmCallback: function () {
                this.alertFn();
            }
        }
    }
</script>