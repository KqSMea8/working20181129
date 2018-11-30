<style lang="stylus" scoped>
    @import '../common/styl/variables.styl'
    .arrow
        width 15px
        height 13px
        display inline-block
        vertical-align middle
        margin-left 10px
        background url(/static/images/hrc-component.png) no-repeat 0 -252px
    .hoverClass
        .arrow
            background-position-y -237px    
    .top-nav
        background-color #232323
        color #999
        min-width $width
        width 100%
        font-size 12px

        .top-nav-content
            margin 0 auto
            width $width
            height 60px
            line-height 60px
            position relative
            .nav-home
                display flex
                display -webkit-flex
                display -moz-box
                display -ms-flexbox
                span
                    font-size 16px
                    color #fff
                    margin-left 20px
                    &.cloudProduct
                        cursor pointer
            .nav-home-right
                position absolute
                right 0
                top 0
                color #fff
                font-size 14px
                span
                    margin-right 10px
                    img
                        vertical-align middle
                .username
                    margin-left 20px
                    cursor pointer
                .help
                    margin-left 20px

</style>

<template>
    <div>
        <div class="top-nav">
            <div class="top-nav-content">
                <div class="nav-home">
                    <img src="/src/assets/image/logo.png" alt="">
                    <span>资源总览</span><span class="productLine">|</span><span class="cloudProduct" :class="{hoverClass:isHover}" @mouseenter="showProduct(0)" @mouseleave="hideProduct(0)">云产品<i class="arrow"></i></span>
                    <div></div>
                </div>
                <div class="nav-home-right">
                    <span>|</span>
                    <span><img src="/static/images/email.png" alt="email"></span>
                    <span>|</span>
                    <span class="username" :class="{hoverClass: userShow}" @mouseenter="showProduct(1)" @mouseleave="hideProduct(1)">{{username}}<i class="arrow"></i></span>
                    <span class="help">帮助与支持</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navList: '',
                user:'',
                isHover:false,
                userShow:false,
                username: 'helloKity'
            }
        },
        mounted() {
            // this.$nextTick(() => {
            //     this.$http.jsonp("http://r.hrc.oa.com/confighandler.ashx", "hrc_GetHeaderdata").then((data) => {
            //         this.navList = data
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // })
            // 获取用户信息
//            this.$http.get('/api/username').then(data => {
//                if (data.status == "200") {
//                    this.username=data.data.username;
//                }
//            }).catch(err => {
//
//            })

            
        },
        computed: {
            userLogout: function () {
                let location = window.location.href;
                return '/_logout/?url=' + location;
            },
            // userImg: function(){
            //     this.user = this.$store.state.user;
            //     return "http://dayu.oa.com/avatars/" + this.user.StaffId + "/avatar.jpg"
            // }
        },
        methods: {
            showProduct(num){
                if(!num){
                    this.isHover=true;
                }
                if(num){
                    this.userShow=true;
                }
            },
            hideProduct(num){
                if(!num){
                    this.isHover=false;
                }
                if(num){
                    this.userShow=false;
                }
            }
        }
    }
</script>