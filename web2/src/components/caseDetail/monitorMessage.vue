
<style scoped>
.chart-body {
  margin-top: 10px;
  height: 29px;
}
.bodybtn {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 76px;
  height: 26px;
  font-family: "microsoft yahei", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  margin-right: 6px;
  float: left;
  cursor: pointer;
}
.bodybtn.active{
  border: 1px solid #007aff;
}
.bodybtn:hover {
  border: 1px solid #007aff;
}
.bodybtn:focus{
  outline:none
}
.bodydate-div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "microsoft yahei", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #fff;
  margin-right: 6px;
  float: left;
  line-height: 26px;
}
.bodydate-date {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 141px;
  font-family: "microsoft yahei", sans-serif;
  font-size: 13px;
  letter-spacing: 1px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  padding: 3px;
  margin: 0 3px;
  cursor: pointer;
}
.bodybtn.search {
  background-color: #007aff;
  color: #fff;
}

.monitor-data {
  overflow: hidden;
}
h4 {
  margin: 0;
  position: absolute;
  top: 20px;
}
.chart {
  width: 500px;
  float: left;
  position: relative;
}
.chart:nth-of-type(2n) {
  margin-left: 100px;
}
</style>
<template>
    <div>
        <div class="case-handle"> 
            <div class="chart-body">
                <button class="bodybtn" :class="curIndex == 0?'active':''" type="button" @click="setDate(0)">今天</button>
                <button class="bodybtn" :class="curIndex == -1?'active':''" type="button" @click="setDate(-1)">昨天</button>
                <button class="bodybtn" :class="curIndex == 7?'active':''" type="button" @click="setDate(7)">7天</button>
                <div class="bodydate-div">
                    <span>日期</span>
                    <input type="text" class="bodydate-date hasDatepicker" @click="openByDrop($event,1)" v-model="query.startDate" readonly>
                    <transition name="fade">
                        <div class="calendar-dropdown" :style="{'left':calendarStart.left+'px','top':calendarStart.top+'px'}" v-if="calendarStart.show">
                            <calendar :zero="calendarStart.zero" :lunar="calendarStart.lunar" :value="calendarStart.value" :begin="calendarStart.begin" :end="calendarStart.end" @select="calendarStart.select"></calendar>
                        </div>
                    </transition>
                    <span>至</span> 
                    <input type="text" class="bodydate-date hasDatepicker" @click="openByDrop($event,2)" v-model="query.endDate" readonly>
                    <transition name="fade">
                        <div class="calendar-dropdown" :style="{'left':calendarEnd.left+'px','top':calendarEnd.top+'px'}" v-if="calendarEnd.show">
                            <calendar :zero="calendarEnd.zero" :lunar="calendarEnd.lunar" :value="calendarEnd.value" :begin="calendarEnd.begin" :end="calendarEnd.end" @select="calendarEnd.select"></calendar>
                        </div>
                    </transition>
                </div>
                <button type="button" class="bodybtn search" @click="getDataList(1)">查询</button>
            </div>
        </div>
        <div class="monitor-data">
          <div class="chart" v-for="(item,index) in monitorList" :key="index">
                <h4>{{item.feature_name}}</h4>
                <div class="mychart" style="height:400px"></div>
          </div>
        </div>
    </div>
</template>

<script>
import calendar from "../calendar.vue";
var echarts = require("echarts");
var aMychart = document.getElementsByClassName("mychart");
var option = {
  xAxis: {
    type: "category",
    data: []
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, '100%'],
    min:function(val){
      return 0
    }
    // min(val){
    //   return 0
    // },
    // max(val){
    //   return 100
    // }
  },
  dataZoom : {
    type : "inside",
    filterMode : "filter"
  },
  tooltip : {
    trigger : 'axis'
  },
  series: [
    {
      data: [],
      type: "line",
      smooth: true,  
      itemStyle : {
          normal : {
              color:'#0076C9',  
              lineStyle:{  
                  color:'#0076C9'  
              }  
          }  
      },  
    }
  ]
};

export default {
  data() {
    return {
      query: {
        // 开始事件
        startDate: "",
        // 结束时间
        endDate: ""
      },
      // 开始时间
      calendarStart: {
        display: "2018-06-16",
        show: false,
        zero: true,
        value: [2018, 6, 16], //默认日期
        lunar: false, //显示农历
        end: [],
        select: value => {
          this.calendarStart.show = false;
          this.calendarStart.value = value;
          this.calendarStart.display = value.join("-");
          this.query.startDate = this.calendarStart.display;
        }
      },
      // 结束时间
      calendarEnd: {
        display: "2018-06-16",
        begin: [],
        show: false,
        zero: true,
        value: [2018, 6, 16], //默认日期
        lunar: false, //显示农历
        select: value => {
          this.calendarEnd.show = false;
          this.calendarEnd.value = value;
          this.calendarEnd.display = value.join("-");
          this.query.endDate = this.calendarEnd.display;
        }
      },
      monitorList: [],
      list: [],
      curIndex : 0
    };
  },
  props : ['row'],
  components: {
    calendar
  },
  mounted() {
    this.setDate(0);
    this.getDataList();
  },
  methods: {
    getDataList() {
      let region_name = this.row.region_name;
      let set_name = this.row.set_name;
      let bid = this.row.bid;
      this.$post(`/bid/${region_name}/${set_name}/${bid}/monitor_config`).then(
        res => {
          loadingClose = true;
          this.list = [];
          // 根据index排序  
          res.monitor_config.sort((a,b)=>{
            return a["index"] - b["index"]
          })
          this.monitorList = res.monitor_config;

          for (let t in this.monitorList) {
            this.list[t] = [];
            this.$get(
              `/monitor/${region_name}/${set_name}/${bid}/${
                this.monitorList[t].feature_id
              }`,{start : this.query.startDate,end : this.query.endDate}
            ).then(res1 => {
              this.$close()
              for (let m in res1.feature_data) {
                this.list[t].push({
                  dt: this.timeFormat(res1.feature_data[m].dt*1000),
                  val: res1.feature_data[m].val
                });
              }
              this.setChart();
            });
          }
        }
      );
    },
    // 日历控件选择
    openByDrop(e, type) {
      this.calendarStart.show = false;
      this.calendarEnd.show = false;
      if (type == 1) {
        this.calendarStart.show = true;
        this.calendarStart.left = e.target.offsetLeft + 0;
        this.calendarStart.top = e.target.offsetTop + 30;
        this.calendarStart.end = this.query.endDate.split("-");
      } else if (type == 2) {
        this.calendarEnd.show = true;
        this.calendarEnd.left = e.target.offsetLeft + 0;
        this.calendarEnd.top = e.target.offsetTop + 30;
        this.calendarEnd.begin = this.query.startDate.split("-");
      }

      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener(
          "click",
          e => {
            this.calendarStart.show = false;
            this.calendarEnd.show = false;
            document.removeEventListener("click", () => {}, false);
          },
          false
        );
      }, 1000);
    },
    // 设置查询
    setDate(type) {
      this.curIndex = type;   
      let date = new Date();
      var year = date.getFullYear(); //得到年份
      var month = date.getMonth(); //得到月份
      var day = date.getDate(); //得到日期
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (type == 0) {
        this.query.startDate = year + "-" + month + "-" + day;
        this.query.endDate = year + "-" + month + "-" + day;
      }

      if (type == -1) {
        if(day == 1){
           if(month == 1){
              let dd = new Date(year - 1,12,0);
              this.query.startDate = (year - 1) + "-" + 12 + "-" + dd.getDate();
              this.query.endDate = (year - 1) + "-" + 12 + "-" + dd.getDate();
            }else{
              let d = new Date(year,month-1,0);
              let oldMonth = (month - 1);
              if(oldMonth < 10) oldMonth = '0' + oldMonth;
              this.query.startDate = year + "-" + (oldMonth) + "-" + (d.getDate());
              this.query.endDate = year + "-" + (oldMonth) + "-" + (d.getDate());
            }            
        }else{
          let oldDay = day - 1;
          if(oldDay < 10) oldDay = '0' + oldDay;
          this.query.startDate = year + "-" + month + "-" + oldDay;
          this.query.endDate = year + "-" + month + "-" + oldDay;
        }
      }
      if (type == 7) {
        if(day <= type){
          if(month == 1){
            let d = new Date(year - 1,12,0);
            this.query.startDate = (year - 1) + "-" + 12 + "-" + oldDay;
            this.query.endDate = year + "-" + month + "-" + day;
          }else{
            let d = new Date(year,month-1,0);
            let oldMonth = (month - 1);
            if(oldMonth < 10) oldMonth = '0' + oldMonth;
            this.query.startDate = year + "-" + oldMonth + "-" + (d.getDate() - (7 - day));
            this.query.endDate = year + "-" + month + "-" + day;
          }       
        }else{
          let oldDay = day - 7;
          if(oldDay < 10) oldDay = '0' + oldDay;
          this.query.startDate = year + "-" + month + "-" + oldDay;
          this.query.endDate = year + "-" + month + "-" + day;
        }
        
      }
      this.calendarStart.value = this.query.startDate.split("-");
      this.calendarEnd.value = this.query.endDate.split("-");
      this.getDataList()
    },
    // 图表
    setChart() {
      for (let i = 0; i < this.list.length; i++) {
        option.xAxis.data = [];
        option.series[0].data = [];
        for(let j = 0; j < this.list[i].length; j++){
          option.series[0].data.push(this.list[i][j].val);
          option.xAxis.data.push(this.list[i][j].dt);
        }
        var myChart = echarts.init(aMychart[i]);
        myChart.setOption(option);
      }
    },
    // 时间戳转化
    timeFormat(time){
      var d = new Date(time);
      // var year = d.getFullYear();
      var month = d.getMonth()+1;
      var date = d.getDate();
      var hours = d.getHours();
      var minutes = d.getMinutes();
      // var seconds = d.getSeconds();
      // return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
      return this.add0(month)+'-'+this.add0(date)+'\n'+this.add0(hours)+':'+this.add0(minutes)
    },
    add0(m){
      return m<10?'0'+m:m 
    }
  }
};
</script>
