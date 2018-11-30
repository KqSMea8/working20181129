<style lang="stylus" scoped>
  .desc-title
    padding 10px 0
    i
      display: inline-block;
      margin: 0 3px 0 10px;
      width: 16px;
      height: 16px;
      background url('/src/assets/image/arrow.png')  no-repeat;
      background-size-x: 16px;
      position: relative;
      top: 6px;
      background-size: 14px 10px;
    span
      &:nth-child(1)
        color: #39f;
        cursor pointer
  .tab-top
    margin 20px 10px 0 
    ul
      height 48px
      text-align center
      display flex
      margin-bottom 5px
      li
        display: inline-block;
        width: 88px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border: 1px #b2cae4 solid;
        color: #0a2637;
        border-radius: 0 2px 2px 0;
        background none
        cursor pointer
        &:hover
          background: #f0f5fa;   

      .active
        display: inline-block;
        width: 88px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        border: 1px #b2cae4 solid;
        background-color: #1278c6 !important;
        border-color: #1278c6;
        color: #fff;
        border-radius: 2px 0 0 2px;
        cursor pointer
        &:hover
          background: #f0f5fa;
    .frame
      .back{
        background#333
        height 300px
        overflow auto
      }
      .none 
        display none
      .block
        display block 
        
  .tab-top-p
      margin-bottom: 28px;
      font-size: 18px;
</style>
<template>
  <div class='desc'>
    <div class="desc-title">
      <span @click="$emit('close')">{{title.content}}</span>
      <i></i>
      <span v-text="title.content=='应用详情'?list.metadata.name:list.mirrorName"></span>
    </div>
    <depict :head-title="headerTitle" :list="headerList" @Instance="Instance"></depict>
    <div class="tab-top">
      <p class="tab-top-p" v-if="title.content=='应用详情'">实例列表</p>
      <ul v-else>
        <li v-for='(item,index) in button' :key="index"  @click="change(item)" :id='item.id' :class='{"active":item.id==frame}'>{{item.content}}</li>
      </ul>
      <div class='frame'>
        <!-- 实例 -->
        <case-exa v-if="headerTitle.type==1" v-on:titleChange="titleChange" v-bind:instance="instance"></case-exa>
        <!-- 日志 -->
        <log v-if="headerTitle.type==2||headerTitle.type==3" class="none back" :class="{'block':frame == 'log'}"></log>
        <!-- 控制台 -->
        <control v-if="headerTitle.type==2" class="none back" :class="{'block':frame == 'control'}"></control>
        <!-- 版本 -->
        <version :mirror-name='headerList.mirrorName' v-if="headerTitle.type==3" class="none" :class="{'block':frame == 'version'}"></version>
      </div>
    </div>  
    
  </div>
</template>
<script>
import depict from "./depict.vue";
import caseExa from "./case.vue";
import log from "./log.vue";
import control from "./control.vue";
import version from "./version.vue";
const apply   = [{id:'case',content:'实例'}],
      example = [{id:'log',content:'日志'},{id:'control',content:'控制台'}],
      mirror  = [{id:'log',content:'日志'},{id:'version',content:'版本'}];
export default {
  name: "tabbar",
  components: { depict ,caseExa,log,control,version},
  props:{
    title:{
      type:Object,
      default:{
        type: 1,
        content: "应用详情"
      }
    },
    list:{
      type:Object,
      default:{
          appName: "angular.js",
          mirrorName: "angular",
          mirrorVersion: "4.1.0",
          state: "-1",
          Number: "1",
          createTime: "2018-01-01",
          //镜像中使用
          updateTime:'2019-01-01',

          desc: "测试测试测试",
          url: "http://www.baidu.com",
          process:2
      },
    }
  },
  data: function() {
    return {
      //匹配框
      frame:'',
      //method
      type:'',
      instance: {
          instanceKey: '',
          instanceValue: ''
      }
    };
  },
  created: function () {
//    console.log(this.list,'this.list')
  },
  computed:{
    headerTitle(){
      let title ={}
      switch(this.type){
        case 2:{
          title={
            type: 2,
            content: "实例详情"
          }
        } 
        break;
        case 3:{
          title={
            type: 3,
            content: "镜像详情"
          }
        }
        break;
        default:title = this.title
      }
      return title
    },
    headerList(){
      let list ={}
      switch(this.type){
        /* case 2:{
          list={
            type: 2,
            content: "实例详情"
          }
        } 
        break; */
        case 3:{
          list={
            mirrorName: 'test',
            mirrorVersion: "onion",
            updateTime:'2018-11-11',
            process:0
          }
        }
        break;
        default:list = this.list
      }
      return list
    },
    button(){
      switch(this.headerTitle.type){
        case 1: return apply;
        case 2: return example;
        case 3: return mirror;
      }
    }
    
  },
  methods:{
    Instance (data) {
        console.log(data,'子组件给父组件川子传值')
        if(data.metadata!=undefined){
          for (var p in data.metadata.labels) {
            this.instance.instanceKey = p
            this.instance.instanceValue = data.metadata.labels[p]
          }
        }
        
    },
    change:function(item){
      console.log(item.id)
      this.frame = item.id;
    },
    titleChange:function(value){
      console.log(value)
      this.type = value.type
      this.frame = this.button[0].id
    },
  },
  mounted: function () {
    this.frame = this.button[0].id
  },
}
</script>
