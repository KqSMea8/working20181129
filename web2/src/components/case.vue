<style lang="stylus" scoped>
table {
  font-size: 14px;
  box-sizing: border-box;
  margin: 20px;
  width: 90%;
  color: #333;
  border: 1px solid #999;
  border-collapse: collapse;
  border-right:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
  border-left 1px solid #e4e4e4;
  border-top 1px solid #e4e4e4

  tr {
    td {
      text-align: center;
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
  }
  .t-header{
    background-color #f5f5f5
    color: #333
  }
  .page{
    float: right 
  }
}
.page-boxs
  overflow:hidden;
  text-align: right;
  width: 91%;
  margin-top: 35px;
</style>
<template>
  <div>
    <table border="1" cellpadding="10">
      <tr class="t-header">
        <td>实例名称</td>
        <td>运行状态</td>
        <td>镜像名称</td>
      </tr>
      <tr v-for='(item,index) in example'>
        <td style="color:#36f;cursor:pointer;" id='case'  @click="openInstanceDetail(item)">{{item.metadata.name}}</td>
        <td :class="state[index].class">{{item.metadata.name}}</td>
        <td style="color:#36f;cursor:pointer;" id='mirror' @click="openMirrorDetail(item)">{{item.metadata.name}}</td>
      </tr>
    </table>
    <div class='page-boxs'>
      <Pagination  class='page'
        ref="setCurent"
        :page-current='page.pageIndex'
        :page-size='page.pageSize'
        :total-count="page.totalCount"
        @current-change="getCurrent"
        @size-change="getSizeChange"
      ></Pagination>
    </div>
    
  </div>
</template>
<script>
import Pagination from "../components/pagination.vue";
export default {
  name: "caseExa",
  components: { Pagination },
  props: ['instance'],
  data: function() {
    return {
      //case
      example: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 2
      }
    };
  },
  created () {
    // this.getInstance()
    console.log(this.instance,'instance')
  },
  computed: {
    state: function() {
      let state = [];
      this.example.map(item => {
        var status = {};
        switch (item.state) {
          case "0":
            status = { stateDesc: "运行中", class: "run" };
            break;
          case "-1":
            status = { stateDesc: "已停止", class: "halt" };
            break;
          case "1":
            status = { stateDesc: "等待中", class: "wait" };
            break;
          case "-2":
            status = { stateDesc: "异常", class: "abnormal" };
            break;
        }
        state.push(status);
      });

      return state;
    }
    // frame:this.button[0].id,
  },
  methods: {
    skip(ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      var deliver = {};
      if (target.id == "case") {
        deliver = { type: 2, id: target.getAttribute("index") };
      }
      if (target.id == "mirror") {
        deliver = { type: 3, id: target.getAttribute("index") };
      }
      this.$emit("titleChange", deliver);
      // console.log(target.getAttribute('index'))
    },
    openInstanceDetail(row){
      this.$router.push("/home/myApplications/detail/test/"+row.metadata.name)
    },
    getCurrent: function(pages) {
      if (this.page.pageIndex !== pages) {
        this.page.pageIndex = pages;
        //                    this.getLists();
        //表格序号列值随页面跳转正确赋值
        let index = (pages - 1) * this.page.pageSize + 1;
        $("#table_global tr:gt(0)").each(function() {
          var id = index++;
          $(this)
            .find("td")
            .eq(0)
            .text(id);
        });
        //将当前page页第一列第一个值传排序js文件
        pageIndex((pages - 1) * this.page.pageSize + 1);
      }
    },
    // 页面之每页x条
    getSizeChange: function(sizes) {
      if (this.page.pageSize !== sizes) {
        this.page.pageSize = sizes;
        //                    this.getLists();
      }
    },
    getInstance () {
      if(this.instance.instanceKey&&this.instance.instanceValue){
        this.$http.get(this.serverHost+'/apis/v1/namesapces/default/pods?labelSelector='+this.instance.instanceKey+'='+this.instance.instanceValue,{
            headers:{
                'Auth-Token':'e18f94b5fa585c7123f56803d925d2e7'
            }
        }).then( res => {
            console.log(res.data,'查询实例')
            this.example = res.data.items
//            this.rows = res.data.items;
        }).catch( err => {
            console.log(err)
        })
      }
        
    }
  },
  watch:{
    'instance.instanceKey'(val,oldVal){
      this.getInstance();
    }
  }
  // mounted: function () {
  //   this.frame = this.button[0].id
  // },
};
</script>
