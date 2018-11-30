<style scoped>
.de-header {
  font-size: 24px;
  padding: 10px 0;
}

.de-box {
  font-size: 14px;
  padding: 15px 0;
}
.de-title {
  margin-bottom: 20px;
  font-size: 18px;
}
ul {
  margin-left: 40px;
}
li {
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
}
li .item-title{
  display: inline-block;
  width: 100px;
  color: #888;
}
.li-url {
  margin-top: 10px;
}
a,
a:active {
  color: #39f;
}
.run {
  color: #30bc64;
}
.halt {
  color: #f14132;
}
.abnormal {
  color: #ff9900;
}
.wait {
  color: #3399ff;
}
.process{
  margin:40px;
  display:flex;
  font-size: 14px;
  margin-top:0;
}
.process .process-box{
  width:150px;
}
.process .process-box .picture{
  display:flex;
  align-items: center;
  height:20px;
  margin-bottom:20px;
}
.process .process-box .picture span{
  width:15px;
  height:15px;
  border-radius:50%;
  border:1px solid #999;
  position: relative;

}
.process .process-box .picture.active span{
  background:#00cc00;
}
.process .process-box .process-title{
  margin-left:-20px;
}
.icon-picture:before{
    content: "";
    border: 1px solid #c1bbbb;
    position: absolute;
    top: 5px;
    width: 134px;
    left: 14px;
}
.change-color{
  background-color: #48ef1c;
  border-color: #48ef1c !important;
}
.change-color:before{
  border-color: #48ef1c;
}
.right-icon{
  background:url('/src/assets/image/right.png') no-repeat;
}
.icon-all-box{
    width: 152px;
    margin-right: 0;
}

.icon-box{
    width: 45px;
    height: 45px;
    border: 1px solid #E5EBF6;
    display: inline-block;
    border-radius: 50%;
    background-color: #FAFCFF;
    line-height: 45px;
    color: #DCE4F0;
    font-size: 18px;
    text-align: center;
    position: relative;
    top: -13px;
}
.travel_image{
    width: 45px;
    height: 45px;
}
.travel_line{
  width: 105px;
  position: relative;
  top: 9px;
  left: 0px;
  margin-right: 0;
}
.icon-all-box:last-child{
  height: 81%;
}
.icon-box:last-child{
    position: relative;
    top: 18px;
}
.icon-hidden{
  visibility: hidden;
}
.icon-title{
  margin-top: 12px;
  display: inline-block;
  margin-left: -9px;
}
.icon-no-title{
  margin-top: 0;
  margin-left: -5px;
}
</style>
<template>
  <div>
    <!-- <div class="de-header">
      <h3>{{content}}</h3>
    </div> -->
    <div class="de-box">
      <div class="de-title">基本信息</div>
      <ul v-if="infoType === 1">
        <li class="li-list">
          <!--:class="{'li-url':item.key == 'url'}"-->
           <span class="item-title">应用名称</span>
           <span class="">{{list.name}}</span>
        </li>
        <li>
          <span class="item-title">镜像名称</span>
          <span class="">{{list.name}}</span>
        </li>
        <li>
          <span class="item-title">镜像版本</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">运行状态</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">实例数量</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">创建时间</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">服务器描述</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">访问地址</span>
          <span class="">{{list.name}}</span>
        </li>
      </ul>
      <ul v-if="infoType === 2">
        <li class="li-list">
          <!--:class="{'li-url':item.key == 'url'}"-->
           <span class="item-title">实例名称</span>
           <span class="">{{list.name}}</span>
        </li>
        <li>
          <span class="item-title">镜像名称</span>
          <span class="">{{list.name}}</span>
        </li>
        <li>
          <span class="item-title">镜像版本</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">运行状态</span>
          <span class="">{{list.name}}</span>
        </li>

        <li>
          <span class="item-title">创建时间</span>
          <span class="">{{list.name}}</span>
        </li>
      </ul>
          <!--v-if="item.key != 'url' && item.key != 'state'" -->

          <!--<a v-if="item.key == 'url'" :href="list[item.key]" class="a">{{list[item.key]}}</a>-->
          <!--<span v-if="item.key == 'state'" :class="state.class" class="sta">-->
            <!--{{state.stateDesc}}-->
          <!--</span>-->
          <!--<span v-if="item.key != 'url' && item.key != 'state'" class="zhuangtai">{{list[item.key]}}</span>-->

        <!--<li v-if="type === 2" v-for="item in title" :class="{'li-url':item.key == 'url'}">-->
          <!--<span class="item-title">{{item.name}}</span>-->
          <!--<a v-if="item.key == 'url'" :href="list[item.key]">{{list[item.key]}}</a>-->
          <!--<span v-if="item.key == 'state'" :class="state.class">-->
            <!--{{state.stateDesc}}-->
          <!--</span>-->
          <!--<span v-if="item.key != 'url' && item.key != 'state'">{{list[item.key]}}</span>-->
        <!--</li>-->
        <!--<li v-if="type === 3" v-for="item in title" :class="{'li-url':item.key == 'url'}">-->
          <!--<span class="item-title">{{item.name}}</span>-->
          <!--<a v-if="item.key == 'url'" :href="list[item.key]">{{list[item.key]}}</a>-->
          <!--<span v-if="item.key == 'state'" :class="state.class">-->
            <!--{{state.stateDesc}}-->
          <!--</span>-->
          <!--<span v-if="item.key != 'url' && item.key != 'state'">{{list[item.key]}}</span>-->
        <!--</li>-->

    </div>
    <div class='process' v-if='infoType==3'>
      <div class='process-box' v-for='(row,index) in list.progessList' :key="index">
        <!-- <div class="picture" :class="{active:index<=list.process}">
          <span :class="{'icon-picture':index<progessList.length-1,'change-color':index<createState}"><i class="right-icon"></i></span>
          <i></i>
        </div> -->
        <div class="icon-all-box">
          <span v-show="row.state==0" class="icon-box" v-text="index+1"></span>
          <img v-show="row.state==1" class="travel_image" src="/src/assets/image/step_done.png">
          <img v-show="row.state==2" class="travel_image" src="/src/assets/image/step_suspending.png">

          <img v-show="row.state==0||row.state==2" :class="{'icon-hidden':index==list.progessList.length-1}" class="travel_line" src="/src/assets/image/travel_not_done.png">
          <img v-show="row.state==1" :class="{'icon-hidden':index==list.progessList.length-1}" class="travel_line" src="/src/assets/image/travel_done.png">
          <span class="icon-title" :class="{'icon-no-title':index==list.progessList.length-1}">{{row.title}}</span>
        </div>
        <!-- <p class='process-title'></p> -->
      </div>
    </div>
  </div>
    
</template>
<script>
//应用
const apply = {}
//  {
//    name: "应用名称",
//    key: "appName"
//  },
//  {
//    name: "镜像名称",
//    key: "mirrorName"
//  },
//  {
//    name: "镜像版本",
//    key: "mirrorVersion"
//  },
//  {
//    name: "运行状态",
//    key: "state"
//  },
//  {
//    name: "实例数量",
//    key: "Number"
//  },
//  {
//    name: "创建时间",
//    key: "createTime"
//  },
//  {
//    name: "服务器描述",
//    key: "desc"
//  },
//  {
//    name: "访问地址",
//    key: "url"
//  }
//];
//实例
const example = [
  {
    name: "应用名称",
    key: "appName"
  },
  {
    name: "镜像名称",
    key: "mirrorName"
  },
  {
    name: "镜像版本",
    key: "mirrorVersion"
  },
  {
    name: "运行状态",
    key: "state"
  },
  {
    name: "创建时间",
    key: "createTime"
  }
];

//镜像
const mirror = [
  {
    name: "镜像名称",
    key: "mirrorName"
  },
  {
    name: "镜像版本",
    key: "mirrorVersion"
  },
  {
    name: "更新时间",
    key: "updateTime"
  }
];
export default {
  name: "depict",
  data() {
      return {
          apply:{},
//          example: {},
//          mirror: {}
      };
  },
  props: {
    // headTitle: {
    //   type: Object,
    //   default: {
    //     type: 1,
    //     content: "应用详情"
    //   }
    // },
    infoType:{
      type:Number,
      default:1
    },
    list: {
      type: Object,
      // default: {
      //   appName: 'nginx',
      //   mirrorName: "nginx",
      //   mirrorVersion: "4.1.0",
      //   state: "1",
      //   Number: "1",
      //   createTime: "2018-01-01",
      //   desc: "测试测试测试",
      //   url: "http://www.baidu.com",
      //   progessList:[
      //     {id:1,title:'上传文件',state:1},
      //     {id:2,title:'拉取基础镜像',state:1},
      //     {id:3,title:'生成新的容器镜像',state:2},
      //     {id:4,title:'创建成功',state:0}
      //   ]
      // }
    }
  },
  created:function() {
      // this.apply = this.list
      // console.log(this.apply,'子组件里面的this.list')
      // this.$emit('Instance', this.apply);
  },
  data() {
    return {
      // progessList:['上传文件','拉取基础镜像','生成新的容器镜像','创建成功'],
      // progessList:[
      //   {id:1,title:'上传文件',state:1},
      //   {id:2,title:'拉取基础镜像',state:1},
      //   {id:3,title:'生成新的容器镜像',state:2},
      //   {id:4,title:'创建成功',state:0}
      // ],
      createState:0
    };
  },
  computed: {
    state: function() {
      let state = {};
      switch (this.list.state) {
        case 0:
          state = { stateDesc: "运行中", class: "run" };
          break;
        case 1:
          state = { stateDesc: "已停止", class: "halt" };
          break;
        case 2:
          state = { stateDesc: "异常", class: "abnormal" };
          break;
        default:
          state = { stateDesc: "等待中", class: "wait" };
          break;
        
      }
      return state;
    },
//    title: function() {
//      let title=[]
//      switch (this.type) {
//        case 1:
//          title = this.apply;
//          break;
//        case 2:
//          title = example;
//          break;
//        case 3:
//          title = mirror;
//          break;
//      }
//      return title
//    }
  },
  mounted: function() {
    this.createState = 1;
  },
  methods: {}
};
</script>
