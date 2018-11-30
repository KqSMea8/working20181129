
<style scoped lang="stylus" >

@import '../../common/styl/detail.styl';

.head {
  overflow: hidden;
}

.head > .left {
  width: 82px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #007aff;
  color: #007aff;
  line-height: 30px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  float: left;
}

.case-handle {
  float: right;
  margin-top: -4px;
}

.chart-body {
  margin-top: 10px;
  height: 29px;
}

.bodybtn {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 76px;
  height: 26px;
  font-family: 'microsoft yahei', sans-serif;
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
  font-family: 'microsoft yahei', sans-serif;
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
  font-family: 'microsoft yahei', sans-serif;
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

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border-spacing: 0;
  border-color: grey;
  margin-top: 15px;
}

table th {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 44px;
  border: 1px solid #e4e4e4;
  text-align: center;
  background: #f5f5f5;
  font-size: 14px;
  font-weight: bold;
}

table td {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 44px;
  border: 1px solid #e4e4e4;
  text-align: center;
  position: relative;
}

td > div {
  width: 14px;
  height: 14px;
  display: inline-block;
  cursor: pointer;
}

.blue {
  color: #007aff;
}

.red {
  color: red;
}
.green{
  color : #4cb43b;
}
.gray {
  color: #999999;
}

.blue span {
  cursor: pointer;
}

.page {
  margin-top: 20px;
}

// .label_content div {
// line-height: 50px;
// }

// .label_content div input {
// width: 345px;
// height: 30px;
// font-size: 13px;
// color: rgb(153, 153, 153);
// padding-left: 10px;
// }

// .label_content p {
// font-size: 12px;
// color: #999999;
// padding-left: 112px;
// }
.calendar-dropdown:before {
  left: 150px;
}

.calendar-dropdown:after {
  left: 150px;
}

.error 
  background url('../../assets/image/tip.png') no-repeat left center
  vertical-align: middle
  position relative

.err_msg1{
  display none
  position: absolute;
  top: -10px;
  z-index: 1060;
  width: 240px;
  padding: 9px 14px;;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  color :#000
  transform translate(-50%,-100%);
  .arrow{
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      left: 50%;
      margin-left: -5px;
      border-bottom-width: 0;
      border-top-color: #999999;
      border-top-color: rgba(0, 0, 0, 0.25);
      top : 100%
      border-width: 11px;
  }
  .arrow:after{
      content: "";
      display: block;
      position: absolute; 
      bottom: -9px;
      margin-left: -10px;
      border-bottom-width: 0;
      border-width: 10px;
      width: 0;
      height: 0;
      border-color: transparent;
      border-top-color: #ffffff;
      border-style: solid;
  }
}
.error:hover .err_msg1{
  display block
}


.power-button {
  border: 0;
  outline: 0;
  padding: 1px 6px 1px 6px;
  align-items: flex-start;
  text-align: center;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  float: left;
}

.power-add {
  box-sizing: border-box;
  min-width: 76px;
  height: 26px;
  font-family: 'microsoft yahei', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #007aff;
  color: #ffffff;
  letter-spacing: 0;
}

.power-add:hover {
  cursor: pointer;
  background-color: #1786ff;
}

.power-add:before {
  content: '';
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 9px;
  position: relative;
  top: 2px;
  background: url('../../assets/image/add_white.png') top right no-repeat;
}
</style>
<template>
    <div>
        <div class="head">
            <!-- <div class="left" @click='setCreate'>+创建备份</div> -->
            <button class="power-button power-add" @click="setCreate">创建备份</button>
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
        </div>
        <table width='100%' cellspacing='0'>
            <thead>
                <tr>
                    <th>实例名称</th>
                    <th>备份名称</th>
                    <th>备份时间</th>
                    <th>备份结果</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="page.totalCount != 0" v-for="(d,i) in backupsList" :key="i">
                    <td>{{row.comment}}</td>
                    <td>{{d.name}}</td>
                    <td>{{d.create_time?d.create_time.split('T')[0] + ' ' + d.create_time.split('T')[1].split('.')[0]:''}}</td>
                    <td :class="d.status==2?'red':d.status==1?'green':'blue'" :title="d.reason">
                        {{d.status==1?'备份成功':d.status==2?"备份失败":'备份中'}}
                        <div v-if="d.status==2" class="red error">
                          <div class="err_msg1">
                            <div class="arrow"></div>
                            <div>{{setErrmsg(d.err_msg)}}</div>
                          </div>
                        </div>
                    </td>
                    <td :class="d.status==1?'blue':'gray'">
                        <span @click="setRecover(d)">数据恢复</span>
                        <!-- <span>下载</span> -->
                    </td>
                </tr>
                <tr v-if="page.totalCount == 0">
                  <td colspan="5">暂无数据</td>
                </tr>
            </tbody>
        </table>

        <!-- 分页 -->
        <div class="page">
            <Pagination
            ref="setCurent"
            :page-current='page.pageIndex'
            :page-size='page.pageSize'
            :total-count="page.totalCount"
            @current-change="getCurrent"
            @size-change="getSizeChange"
            ></Pagination>
        </div>

        <!-- 创建备份 -->
        <model :show="create.show" :dialog="dialog" :width="772" :confim="create.confirmOk" @confirm-btn="confirmCreate"  @cancel-btn="cancelCreate">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">
                        {{row.comment}}
                      </div>
                    </div>                     
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">
                        {{row.bid}}
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">备份名称：</p>
                      <div class="td_val">
                        <input type="text" class="text_input" @blur="clearBlur()" v-model="create.name" placeholder="请输入备份名称">
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="clearBlur(1)" v-model="create.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="create.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">执行后将备份实例数据，请输入实例密码授权操作</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </model>

        <!-- 数据恢复 -->
        <model :show="recover.show" :dialog="dialog" :width="772" :confim="recover.confirmOk" @confirm-btn="confirmRecover"  @cancel-btn="cancelRecover">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">
                        {{row.comment}}
                      </div>
                    </div>                  
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">
                        {{row.bid}}
                      </div>
                    </div>            
                    <div class="table_tr">
                      <p class="td_name">备份名称：</p>
                      <div class="td_val">
                        {{recover.name}}
                      </div>
                    </div>                  
                    <div class="table_tr">
                      <p class="td_name">备份时间：</p>
                      <div class="td_val">
                        {{recover.time}}
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="recoverBlur(1)" v-model="recover.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="recover.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">恢复后数据将被覆盖，请输入实例密码授权操作</div>
                      </div>
                    </div> 
                  </div>
                </div>
            </div>
        </model>
    </div>
</template>

<script>
import model from "../modal.vue";
import calendar from "../calendar.vue";
import Pagination from "../pagination.vue";

export default {
  data() {
    return {
      // 备份数据
      backupsList: [],
      curIndex: 7,
      // 创建备份
      create: {
        show: false,
        name: "",
        region_name: "",
        set_name: "",
        bid: "",
        password: "",
        confirmOk: true,
        check1: false
      },
      // 恢复数据
      recover: {
        show: false,
        confirmOk: true,
        name: "",
        time: "",
        password: "",
        path : ""
      },
      dialog: {
        show: false,
        footer: true,
        head: "标题",
        body: "内容",
        cancelBtn: "取消",
        confirmBtn: "确定",
        cancelBtnShow: true
      },
      // 分页
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: ""
      },
      query: {
        // 开始事件
        startDate: "",
        // 结束时间
        endDate: "",
        // 搜索任务ID/实例ID/操作人/IP
        name: ""
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
      // 父页面值
      parent: {
        bid: "",
        region_name: "",
        set_name: "",
        old_password: ""
      }
    };
  },
  components: {
    model,
    calendar,
    Pagination
  },
  props : ['row'],
  created() {
    this.setDate(7);    
    this.getDataList();
    this.getDetail();
  },
  methods: {
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
      let bid = this.row.bid;
      let start = this.query.startDate;
      let end = this.query.endDate;
      let page_index = this.page.pageIndex;
      let page_size = this.page.pageSize;
      this.$get(
        `/backup?bid=${bid}&start=${start}&end=${end}&page_index=${page_index}&page_size=${page_size}`
      ).then(res => {
        this.backupsList = res.backup;
        this.page.totalCount = res.count;
      });
    },
    // 日历控件选择
    openByDrop(e, type) {
      this.calendarStart.show = false;
      this.calendarEnd.show = false;
      if (type == 1) {
        this.calendarStart.show = true;
        this.calendarStart.left = e.target.offsetLeft - 75;
        this.calendarStart.top = e.target.offsetTop + 30;
        this.calendarStart.end = this.query.endDate.split("-");
      } else if (type == 2) {
        this.calendarEnd.show = true;
        this.calendarEnd.left = e.target.offsetLeft - 75;
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
              this.query.endDate = (year - 1) + "-" + month + "-" + dd.getDate();
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
      this.getDataList();
    },
    /* ----------------------------------恢复数据-弹出框------------------------------- */
    // 打开弹窗
    setRecover(d) {
      if (!d.status) return;
      this.dialog.head = "数据恢复";
      this.recover.show = true;
      this.recover.name = d.name;
      this.recover.time = d.create_time?d.create_time.split('T')[0] + ' ' + d.create_time.split('T')[1].split('.')[0]:'';
      this.recover.path = d.path
    },
    // 离开form表单
    recoverBlur() {
      if (!this.recover.password) {
        return;
      }
      // if (this.recover.password != this.parent.old_password) {
      //   this.recover.check1 = true;
      //   this.recover.confirmOk = true;
      // } else {
      //   this.recover.check1 = false;
      //   this.recover.confirmOk = false;
      // }
      this.recover.check1 = false;
      this.recover.confirmOk = false;
    },
    // 确认操作-数据恢复
    confirmRecover() {
      // let region_name = this.parent.region_name;
      // let set_name = this.parent.set_name;
      // let bid = this.parent.bid;
      let params = {
        region_name : this.parent.region_name,
        set_name : this.parent.set_name,
        bid : this.parent.bid,
        format: 1,
        password: this.recover.password,
        path: this.recover.path
      };
      this.$post(`/bid/${params.region_name}/${params.set_name}/${params.bid}/restore`, params).then(
        res => {
          this.recover.show = false;
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
        }
      );
    },
    // 取消按钮事件
    cancelRecover() {
      this.recover.show = false;
    },
    /* ----------------------------------数据备份-弹出框------------------------------- */
    // 确定按钮事件
    confirmCreate() {
      let params = {
        // bid: this.create.bid,
        backup_name: this.create.name,
        // region_name: this.create.region_name,
        // set_name: this.create.set_name,
        password: this.create.password,
        format : 1
      };
      this.$post(
        `/bid/${this.create.region_name}/${this.create.set_name}/${this.create.bid}/save`,
        params
      ).then(res => {
          this.create.show = false;
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
      });
    },
    // 取消按钮事件
    cancelCreate() {
      this.create.show = false;
      this.create.password = "";
      this.create.name = "";
    },
    // form表单离开事件
    clearBlur(type) {
      if (!this.create.password || !this.create.name) {
        return;
      }
      if (this.create.name) {
        // if (this.create.password != this.parent.old_password) {
        //   this.create.check1 = true;
        //   this.create.confirmOk = true;
        // } else {
        //   this.create.check1 = false;
        //   this.create.confirmOk = false;
        // }
        this.create.check1 = false;
        this.create.confirmOk = false;
      }
    },
    // 打开弹出框
    setCreate(index) {
      this.create.bid = this.parent.bid;
      this.create.region_name = this.parent.region_name;
      this.create.set_name = this.parent.set_name;
      // this.create.old_password = this.parent.password;
      this.create.show = true;
      this.dialog.head = "数据备份";
    },
    // 获取父页面的传值
    getDetail() {
      this.parent = {
        bid: this.row.bid,
        region_name: this.row.region_name,
        set_name: this.row.set_name,
        // old_password: ""
      };
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
