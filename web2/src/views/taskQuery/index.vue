<!-- 任务查询 -->
<style lang="stylus" scoped>
@import './index.styl';
</style>

<template>
    <div class="my-case">
        <div>
            <div class="case-header">
                <h3>任务查询</h3>
            </div>
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
                  <div class="power-search">
                      <input type="text" class="input-search" v-model="query.name" placeholder="搜索任务ID/实例ID/实例名称/操作人">
                      <span class="icon-search" @click="getDataList(2)"></span>
                  </div>
              </div>
            </div>
            <div class="case-list">
                <table border="1" cellpadding="10">
                    <tr class="t-header">
                        <th>任务ID</th>
                        <th>任务类型
                          <query
                            :types="4"
                            :list="taskTypeList.manager"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th>所属区域
                          <query
                            :types="1"
                            :list="regionList"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th>可用区
                          <query
                            :types="2"
                            :list="areaList"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th>实例名称</th>
                        <th>实例ID</th> 
                        <th>实例版本</th>
                        <th>操作人</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>任务结果
                          <query
                            :types="5"
                            :list="taskResultList"
                            :right="true"
                            @current="getQueryVal">
                          </query>
                        </th> 
                    </tr>
                    <tbody>
                    <template v-for="(row,index) in rows">
                        <tr :key="index">
                            <td>{{row.job_id}}</td>
                            <td>{{getType(row.op)}}</td>
                            <td>{{row.region}}</td>
                            <td>{{row.set}}</td>
                            <td>{{row.bid_name}}</td>
                            <td>{{row.bid}}</td>  
                            <!-- <td>{{row.is_cluster==1?'集群版':'主从版'}}</td>   -->
                            <td>{{'版本字段待确定'}}</td>  
                            <td>{{row.creator}}</td> 
                            <td>{{row.create_time ? row.create_time:'-'}}</td> 
                            <td>{{row.end_time=="0001-01-01 00:00:00" ? '-':row.end_time}}</td>
                            <td>
                              <span :class="'status s'+row.state">{{getResult(row.state)}}</span>
                              <i class="reason" v-if="row.state == 2">
                                <div class="err_msg">
                                  <div class="arrow"></div>
                                  <div>{{setErrmsg(row.err_msg)}}</div>
                                </div>
                              </i>
                            </td>
                        </tr>
                    </template>
                    <tr v-if="rows.length <= 0 && isLoading">
                      <td colspan="10">暂无数据</td>
                    </tr>
                    </tbody>
                </table>
                <!-- 分页 -->
                <div>
                  <Pagination
                  ref="setCurent"
                  :page-current='page.pageIndex'
                  :page-size='page.pageSize'
                  :total-count="page.totalCount"
                  @current-change="getCurrent"
                  @size-change="getSizeChange"
                  ></Pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from "../../components/pagination.vue";
import query from "../../components/listquery.vue";
import calendar from "../../components/calendar.vue";
export default {
  components: {
    Pagination,
    query,
    calendar
  },
  data() {
    return {
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
      // 分页
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 2
      },
      // 列表数据
      rows: [],
      name: "",
      // 是否点击更多
      isMore: false,
      // 当前行-更多
      currentRow: -1,
      // 列表查询条件
      query: {
        /* ---------------------查询条件--------------------- */
        // 所属区域
        region: "",
        // 可用区
        area: "",
        // 资源状态
        resource: "",
        // 任务类型
        taskType: "",
        // 任务结果
        tashResult: -1,
        /* ---------------------查询条件--------------------- */
        // 开始事件
        startDate: "",
        // 结束时间
        endDate: "",
        // 搜索任务ID/实例ID/操作人/IP
        name: "",
      },
      /* ---------------------列表数据--------------------- */
      // 所属区域列表
      regionList: [],
      // 可用区列表
      areaList: [],
      // 资源状态列表
      resourceList: [
        { id: 0, name: "运行中", is_cluster: false },
        { id: 1, name: "创建中", is_cluster: false },
        { id: 5, name: "备份中", is_cluster: false },
        { id: 6, name: "恢复中", is_cluster: false },
        { id: 3, name: "扩缩容中", is_cluster: false },
        { id: 10, name: "清空中", is_cluster: false },
        { id: 2, name: "搬迁中", is_cluster: false },
        { id: 4, name: "主备切换中", is_cluster: false },
        { id: 11, name: "销毁中", is_cluster: false },
        { id: -1, name: "异常", is_cluster: false }
      ],
      // 任务类型
      taskTypeList: {
        user: [
          { id: 1, name: "新建实例", is_cluster: false },
          { id: 5, name: "实例备份", is_cluster: false },
          { id: 6, name: "实例恢复" }
        ],
        manager: [
          { id: 1, name: "新建实例", is_cluster: false },
          { id: 2, name: "实例搬迁", is_cluster: false },
          { id: 3, name: "实例扩容", is_cluster: false },
          { id: 4, name: "主备切换", is_cluster: false },
          { id: 5, name: "实例备份", is_cluster: false },
          { id: 6, name: "实例恢复", is_cluster: false },
          { id: 7, name: "重建强一致", is_cluster: false },
          { id: 10, name: "下架存储节点", is_cluster: false },
          { id: 11, name: "清空存储节点", is_cluster: false },
          { id: 12, name: "清空实例", is_cluster: false },
          { id: 13, name: "销毁实例", is_cluster: false },
          { id: 14, name: "修改密码", is_cluster: false }
        ]
      },
      // 任务结果
      taskResultList: [
        { id: 1, name: "成功", is_cluster: false },
        { id: 2, name: "失败", is_cluster: false },
        { id: 3, name: "执行中", is_cluster: false }
      ],
      /* ---------------------列表数据--------------------- */
      // 当前用户| 普通用户：user、管理员：manager
      login: "manager",
      // 列表头部下拉框点击-类型
      currentType: -1,
      // 是否请求完成
      isLoading: false,
      // 选中按钮
      curIndex:0
    };
  },
  mounted() {
    this.setDate(0);
    this.getDataList();
    this.getRegionList();
    this.getAreaList();
  },
  methods: {
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
    // 页面之跳转到x页
    getCurrent: function(pages) {
      if (this.page.pageIndex !== pages) {
        this.page.pageIndex = pages;
        this.getDataList();
      }
    },
    // 页面之每页x条
    getSizeChange: function(sizes,max) {
      if (this.page.pageSize !== sizes) {
        if(this.page.pageIndex>max){
          this.page.pageIndex = max;
        }
        this.page.pageSize = sizes;
        this.getDataList();
      }
    },
    // 获取列表数据
    getDataList() {
      this.isLoading = false;
      let that = this;
      let params = {
        region_name: this.query.region,
        set_name: this.query.area,
        start_date: this.query.startDate,
        end_date: this.query.endDate, 
        state: this.query.tashResult,
        page_size: this.page.pageSize,
        page_index: this.page.pageIndex,
        query: this.query.name,
        op: this.query.taskType
      };
      let url = `/job/${params.start_date}/${params.end_date}?region_name=${params.region_name}&set_name=${params.set_name}&query=${params.query}&state=${params.state}&op=${params.op}&page_index=${params.page_index}&page_size=${params.page_size}`;
      this.$get(url).then(res => {
        that.rows = res.jobs;
        that.page.totalCount = res.count;
        this.isLoading = true;
        // that.query.name = "";
      });
    },
    // 列表头部-区域列表
    getRegionList() {
      let that = this;
      let region_name = "region_name";
      let set_name = "";
      let page_index = 1;
      let page_size = 1000; 
      this.$get(`/region/${region_name}?page_index=${page_index}&page_size=${page_size}`).then(res => {
        that.regionList = res.regions[0].sets;

      });
    },
    // 列表头部-可用区列表
    getAreaList() {
      let that = this;
      let region_name = ""; 
      let page_index = 1;
      let page_size = 1000;
      this.$get(`/set/${region_name}?page_index=${page_index}&page_size=${page_size}`).then(res => {
        that.areaList = res.sets;
      });
    }, 
    // 列表头部-下拉框选中值
    getQueryVal(obj) {
      this.currentType = obj.type;
      if (obj.type == 1) {
        // 所属区域
        this.query.region = obj.name;
      } else if (obj.type == 2) {
        // 可用区
        this.query.area = obj.name;
      } else if (obj.type == 4) {
        // 任务类型
        this.query.taskType = obj.id;
      } else if (obj.type == 5) {
        // 任务结果
        if(obj.id==''){
          this.query.tashResult = -1;
        }else{
          this.query.tashResult = obj.id;
        }
      }
      this.page.pageIndex = 1;
      this.getDataList();
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
            this.query.startDate = (year - 1) + "-" + 12 + "-" + (d.getDate() - (7 - day));
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
    // 获取任务类型名称
    getType(type){
      let name =''; 
      switch(type){
        case 1:
          name = "新建实例";
          break;
        case 2:
          name = "实例搬迁";
          break;
        case 3:
          name = "实例扩容";
          break;
        case 4:
          name = "主备切换";
          break;
        case 5:
          name = "实例备份";
          break;
        case 6:
          name = "实例恢复";
          break;
        case 7:
          name = "重建强一致";
          break;
        case 10:
          name = "下架存储节点";
          break;
        case 11:
          name = "清空存储节点";
          break;
        case 12:
          name = "清空实例";
          break;
        case 13:
          name = "销毁实例";
          break;
        case 14:
          name = "修改密码";
          break;
      }
      return name;
    },
    getResult(type){
      let name ='';  
      switch(type){
        case 0:
          name = "执行中";
          break;
        case -1:
          name = "所有";
          break;
        case 1:
          name = "成功";
          break;
        case 2:
          name = "失败";
          break;
      }
      return name;
    },
    setErrmsg(val){
        switch (val) {
            case "ok":
                return "正常"
            case "error occurred during searching":
                return "搜索失败，请稍后重试"
            case "error occurred during recording":
                return "创建失败，请稍后重试"
            case "error occurred during deleting":
                return "删除失败，请稍后重试"
            case "parameter(s) is invalid":
                return "参数错误，请重新输入"
            case "password required":
                return "请输入密码授权操作"
            case "ip is serving another region":
                return "该IP已被占用，请重新选择"
            case "internal error":
                return "内部服务错误，请检查密码或联系管理员"
            case "region alreay exists":
                return "该集群已存在，请重新输入"
            case "password is wrong":
                return "密码错误，请重新输入"
            case "invalid parameter(s)":
                return "参数错误，请重新输入"
            case "internal(master) error":
                return "内部服务错误，请检查密码或联系管理员"
            case "no master in region":
                return "该集群没有管理节点，请联系管理员"
            case "master already exists":
                return "该管理节点已存在，请重新输入"
            case "internal(etcd) error":
                return "内部服务错误，请检查密码或联系管理员"
            case "mininal masters":
                return "集群的管理节点不可少于3台，无法下架"
            case "internal(backup svr) error":
                return "内部服务错误，请检查密码或联系管理员"
            case "set exists":
                return "该可用区已存在，请重新输入"
            case "exit status 127":
                return "内部错误"
            case "ERR shard exist in dump list":
                return "迁移目标服务器已存在分片"
            case "no available caches to create backup shard in set[1]":
                return "在可用区[1]上没有足够的cache,无法创建备份分片"
            case "replica[42] has no legal backup shard switched to be leader":
                return "[42]分片没有有效的备分片用来切换为主分片"
            default:
                return val
        }
    }
  }
};
</script>