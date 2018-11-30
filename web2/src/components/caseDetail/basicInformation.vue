
<style lang="stylus"  scoped>

.message {
    margin-bottom: 30px;
}

.message > div {
    overflow: hidden;
    line-height: 100%;
}

.message .title {
    min-width: 115px;
    color: #888888;
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 14px;
}

.message .item-content {
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    color: #333333;
    font-size: 14px;
}
.item-content p:hover .show{
    display inline-block
}

.message .cache-ip {
    // display: block;
}

.message .password {
    display: inline-block;
    min-width: 80px;
}

small {
    color: #06c;
    cursor: pointer;
    margin-left: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    border-spacing: 0;
    border-color: grey;
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
}

td {
    height: 44px;
    text-align: center;
    padding: 10px 20px;
    color: #000;

    em {
        font-style: normal;
        padding-left: 17px;
        &.s0{
            background: url(../../assets/image/status_running.png) no-repeat left center
            color: #4cb43b
        }
        &.s1 {
            background: url('../../assets/image/status_running.png') no-repeat left center;
            color: #4cb43b;
        }

        &.s2, &.s3 {
            background: url('../../assets/image/status_wait.png') no-repeat left center;
            color: #4370bc;
        }

        &.s4 {
            background: url('../../assets/image/status_stopped.png') no-repeat left center;
            color: #f46a6a;
        }
    }
}

.copy-icon {
    background: url('../../assets/image/copy.png') no-repeat;
    cursor: pointer;
}
.copy{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
}
.show{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    background: url('../../assets/image/copy.png') no-repeat;
    display: none;
    display: none;
}
</style>
<template>
    <div>
        <div class="message">
            <div>
                <p class="title">实例名称</p>
                <p class="item-content">{{row.comment}}</p>
            </div>
            <div>
                <p class="title">实例ID</p>
                <p class="item-content">{{row.bid}}</p>
            </div>
            <div>
                <p class="title">所属区域</p>
                <p class="item-content">{{row.region_name}}</p>
            </div>
            <div>
                <p class="title">可用域</p>
                <p class="item-content">{{row.set_name}}</p>
            </div>
            <div>
                <p class="title">实例版本</p>
                <p class="item-content">{{row.is_cluster==1?'集群版':'主从版'}}</p>
            </div>
            <div>
                <p class="title">Redis版本</p>
                <p class="item-content">{{'待确定字段'}}</p>
            </div>
            <div>
                <p class="title">实例规格</p>
                <p class="item-content" v-if="row.is_cluster != undefined">{{'待确定'}}</p>
            </div>
            <div>
                <p class="title item" style="vertical-align: top;">访问地址</p>
                <div class="item-content" v-if="row.replicas">
                    <p  v-for="(item1 ,index1) in row.replicas[0].shards" :key="index1">
                        <span class="cache-ip">{{item1.cache_ip}}({{item1.role == 1 ? '主':'备'}})</span>
                        <i class="copy">
                            <i class="show" @click="copy(item1,index1)"></i>
                        </i>
                    </p>
                </div>
                <!-- <p class="item-content">
                    <span class="cache-ip" v-for="(d,i) in replicas.shards" :key="i" @mouseover="over" @mouseout="out">{{d.cache_ip}}</span>
                    <span v-if="copy_flag" class="copy-icon" @click="copy(d,i)"></span>
                </p> -->
            </div>
            
            <div v-if="row.is_cluster==1">
                <p class="title">分片数量</p>
                <p class="item-content">{{row.replicas?row.replicas.length:'-'}}</p>
            </div>

            <div v-if="row.is_cluster==1">
                <p class="title">分片容量</p>
                <p class="item-content">{{"待确定字段"}}</p>
            </div>

            <div>
                <p class="title">实例容量</p>
                <p class="item-content">{{unit(row.total_mem_size)}}/{{unit(row.used_mem_size)}}({{row.total_mem_ratio}}%)</p>
            </div>
            <!-- <div>
                <p class="title">使用容量</p>
                <p class="item-content">{{unit(row.used_mem_size)}}</p>
            </div>
            <div>
                <p class="title">容量使用率</p>
                <p class="item-content" v-if="row.total_mem_ratio != undefined">{{row.total_mem_ratio}}%</p>
            </div> -->
            <div>
                <p class="title">状态</p>
                <p class="item-content">{{row.statue_name}}</p>
            </div>
            <div>
                <p class="title">维护人</p>
                <p class="item-content">{{row.creator}}</p>
            </div>
            <div>
                <p class="title">创建时间</p>
                <p class="item-content">{{create_time}}</p>
            </div>
        </div>
        <div v-if="row.is_cluster==1&&row.replicas&&row.replicas.length>0" v-for="(item2,index2) in row.replicas" :key="index2">
            <h4>分片-({{index2+1}})</h4>
            <table>
                <thead>
                    <tr>
                        <th>分片类型</th>
                        <th>分片ID</th>
                        <th>存储节点</th>
                        <th>总容量</th>
                        <th>使用容量</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(d,i) in item2.shards" :key="i">
                        <td>{{d.role == 1 ? '主分片':'备分片'}}</td>
                        <td>{{d.oplog_gid}}</td>
                        <td>{{d.cache_ip}}</td>
                        <td>{{unit(d.total_mem_size)}}</td>
                        <td>{{unit(d.used_mem_size)}}</td>
                        <td>
                            <em :class="'status s'+d.state">{{d.state_name}}</em>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: {},
      replicas: {},
      password: "********",
      btnText: "查看",
      flag: true,
      copy_flag: false,
      create_time : ''
    };
  },
  props:['row'],
  mounted() {
        this.$nextTick(()=>{
            this.row.create_time?this.create_time = this.row.create_time.split('T')[0] + ' ' + this.row.create_time.split('T')[1].split('.')[0]:''
            // this.row.replicas? this.replicas = this.row.replicas[0]:[];
        })
  },
  methods: {
    over() {
      this.copy_flag = true;
    },
    out() {
      this.copy_flag = false;
    },
    copy(item,i) {
      // 创建'虚拟'DOM
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", item.cache_ip);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$alert("复制成功");
      }
    },
    // 容量转换GB|MB
    unit(val) {
      if(val == undefined) return;
      let newVal = val;
      let unit = "MB";
      if (val >= 1024) {
        newVal =
          (val / 1024).toFixed(1).split(".")[1] != 0
            ? (val / 1024).toFixed(1) + "GB"
            : (val / 1024).toFixed(1).split(".")[0] + "GB";
      } else {
        newVal = val + unit;
      }
      return newVal;
    },
    // 容量使用率%
    rate(total, used) {
      if (total && used) {
        let rate = total / used / 1024;
        return rate.toFixed(1).split(".")[1] != 0
          ? rate.toFixed(1)
          : rate.toFixed(1).split(".")[0];
      } else {
        return 0;
      }
    }
  }
};
</script>
