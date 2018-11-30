<style lang="stylus" scoped>
@import './index.styl';
</style>

<template>
    <div>
        <div class="header">
            <span class="header-item" @click='goBack'>Redis实例管理</span>
            <span>&gt;</span>
            <span>{{row.comment}}详情</span>
        </div>
        <div class="tab">
            <div v-for="(d,i) in tabList" :key="i" :class="curIndex==i?'tab-active':''" @click="tabClick(i)">{{d}}</div>
            <div class="clear"></div>
        </div>
        <div :is='showComponent' :row='row'></div>
    </div>
</template>

<script>
import basicInformation from "../../components/caseDetail/basicInformation.vue";
import backups from "../../components/caseDetail/backups.vue";
import monitorMessage from "../../components/caseDetail/monitorMessage.vue";
export default {
  data() {
    return {
      curIndex: 0,
      showComponent: "basicInformation",
      tabList: ["基本信息", "备份与恢复", "监控信息"],
      row : {}
    };
  },
  components: {
    basicInformation,
    backups,
    monitorMessage
  },
  mounted: function() {
    // 获取列表页面传过来的参数
    let type = this.$route.params.type; 
    if(this.$route.params.message==undefined){
      this.row = JSON.parse(localStorage.getItem('message'));
    }else{
      this.row = this.$route.params.message;
    }
    if(type != 0){
      this.tabClick(type);
    } else{
      this.tabClick(this.curIndex); 
    }  
  },
  methods: {
    // 返回上一级
    goBack() {
      this.$router.push({ name: "caseManage" });
    },
    //tab点击
    tabClick(i) {
      this.curIndex = i;
      switch (+i) {
        case 0:
          this.showComponent = "basicInformation";
          break;
        case 1:
          this.showComponent = "backups";
          break;
        case 2:
          this.showComponent = "monitorMessage";
          break;
        default:
          break;
      }
      this.$router.push({ name: "caseManageDetail",params : {id : this.row.bid,type : 0}});
    }
  }
};
</script>
