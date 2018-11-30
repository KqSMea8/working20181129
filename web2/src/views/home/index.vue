<style lang="stylus" scoped>
    @import '../../common/styl/variables.styl'
    @import './index.styl'
</style>

<template>
    <div class="home">
        <div class="left-link">
            <div class="left-menu">
                <h3 class="collapse-tshift" @click="test(2,'div')">
                    <router-link :to="{name:'caseManage'}">TRedis服务</router-link>
                </h3>
                <div class="collapse-box" v-for="(nav,index) in navs"  :key="index">
                    <div @click="test(index,'div')">
                        <router-link :to="{name:nav.rootLink}" tag="h3" class="collapse-title" :class="{'color-active':chooseId==index}">
                            <i :class="{'collapse-title-active':chooseId==index}"></i>
                            {{nav.siteName}}
                        </router-link>
                    </div>
                    <ul class="collapse-links">
                        <li v-for="(link,index) in nav.children" @click="test(index)" :key="index">
                            <router-link :to="{name:link.link}" active-class="user_selected">{{link.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right-view">
            <div class="breadcrumb clearfix"></div>
            <div class="view-area">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                navs: 
                [
                    {
                        rootLink: "caseManage",
                        link: 'caseManage',
                        siteName: 'Redis实例管理'
                    },
                    {
                        rootLink: "taskQuery",
                        link: 'taskQuery',
                        siteName: '任务查询'
                    }
                ],
                chooseId:0
            }
        },
        mounted(){
            if(this.$route.name=='taskQuery'){
                this.chooseId = 1;
            }
        },
        methods:{
            test(index,ele){
                this.chooseId = index;               
            }
        },
        
        watch:{
            '$route'(val){
                if(val.name=='taskQuery'){
                    this.chooseId = 1;
                }
            }
        }
    }
</script>