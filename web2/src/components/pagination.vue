<style lang="stylus" scoped>
/*style*/
.ex-pagination-contain {
  display: inline-block;
  font-size: 13px;
  color: #48576a;
  user-select: none;
  width: 100%;
}

a.ex-pagination-btn {
  min-width: 38px;
  line-height: 28px;
  /*color: #704cfe;*/
  text-align: center;
  border: 1px solid #eaeff6;
  border-radius: 2px;
  padding: 0 2px;
  margin: 0 2px;
  display: inline-block;
  color: #cfcfcf;
  font-size: 14px;
}
a.add-border-left {
  border-left: 1px solid #ccc;
}

a.ex-pagination-btn:hover {
  color: #033333;
  background-color: #e1e8f5;
  cursor: pointer;
}

a.ex-pagination-active {
  color: #48576a;
}

a.ex-pagination-actives {
    pointer-events: none;
    border: 0;
    color: #033333;
    cursor: default;
    margin:0;
}

a.ex-pagination-active:hover {
  color: #704cfe;
  background-color: transparent;
  cursor:default;
}
a.ex-pagination-actives:hover {
  color: #0c1e31;
  background-color: #e4e4e4;
  cursor: default;
}

input.ex-pagination-input {
  width: 30px;
  line-height: 26px;
  padding: 0 2px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #ccc;
}
.f-left {
  float: left;
  color: #9caec1;
  font-size: 14px;
  line-height: 40px;
}
.f-right {
  float: right;
}
.ex-pagination-total-i {
  font-style: normal;
}
.add-right-length {
  margin-right: 40px;
}
.iconfont-next-more-left {
  transform: rotate(-180deg);
}
.ex-pagination-btn img {
  display: inline-block;
  vertical-align: middle;
}
.add-width {
  width: 56px;
  background-color: #fff !important;
}
.add-width img {
  transform: rotate(90deg);
  width: 10px;
  height: 18px;
  margin-left: 3px;
}
.size_chosen{
  display:inline-block;
  line-height: 22px;
  width: 60px;
  border: 1px solid  #ccc;
  border-top: transparent;
  box-shadow: none;
  color: #033333;
  text-decoration: none;
  background: none;
  font-size: 13px;
  margin-right: 5px; 
  position: relative;
  border-radius: 0px 0px 3px 3px;
}
.pages{
  padding:5px 5px; 
  position: absolute;  
  bottom: 29px;
  left: -1px;  
  background: #fff; 
  border: 1px solid  #ccc;
  border-bottom: none; 
  border-radius: 3px 3px 0px 0px;
  width:60px; 
  box-sizing:border-box;  
  z-index: 10;  
}
.page-size{
  line-height: 22px;
  text-align: center;
  box-shadow: none;
  color: #033333;
  text-decoration: none;
  height: 80px;
  overflow-y: auto; 
    &::-webkit-scrollbar {
    width:5px;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
      border-radius:10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius:10px;
      background:rgba(0,0,0,0.1);
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
      background:rgba(255,0,0,0.4);
    }
}

.page-size li:hover{
   background:#b2cae4;
}
.page-size .active{
  background:#b2cae4;
}
.select-size{
  text-align: center;
  line-height: 28px;
    .selct_icon{
      width: 10px;
      height: 5px;
      display: inline-block;
      position: relative;
      top: -3px;
      left: 4px;      
    }
    .up{
      background: url(../assets/image/page_up.png) center no-repeat;
    }
    .down{
      background: url(../assets/image/page_down.png) center no-repeat;
    }
}
.size_chosen.redis{
   border-top: 1px solid  #e4e4e4;
   border-radius:3px;
   border-color:#e4e4e4;
}
.select-size.redis{
   border-top: 1px solid #ccc;
}
</style>
<template>
    <!-- template -->
    <div class='ex-pagination-contain'>
        <span class='ex-pagination-total add-right-length f-left'>
<!--         <a :class="[page === currentNum ? 'ex-pagination-active' : '']"
           class="ex-pagination-btn add-width" @click="currentChange(page)">{{page}}/{{totalPages}} <img src="../assets/image/next.png">
        </a> -->
            <i class="ex-pagination-total-i">共{{totalCount}}条记录 , 共{{totalPages}}页</i>
            <!-- 每页显示 <i class="ex-pagination-total-i">{{sizeNumber}} 行</i> -->
        </span>
        <span class="f-right">
            <div class="size_chosen" @click='pageSizeShow = !pageSizeShow' :class='{"redis":!pageSizeShow}'>
                <div class="pages" v-show='pageSizeShow'>
                  <ul class="page-size" >
                    <li v-for='(item,index) in pasgSiZeArray' :key='index' @click.stop='sizeChanges(item)' :class='{"active":sizeNum == item}'>{{item}}</li>
                  </ul>
                </div>
                <div class="select-size" :class='{"redis":pageSizeShow}'>{{sizeNum}}<span :class="(pageSizeShow ? 'up':'down')" class="selct_icon"></span></div>
            </div>
            <!-- <select class="size_chosen" v-model="pageSize">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select> -->
            <!-- <a :class="[currentNum === 1 ? 'ex-pagination-active' : '']"
            class="ex-pagination-btn add-border-left" @click="currentChange(1)">
                <img class="iconfont-next-more-left" src="../assets/image/next-more.png">
            </a> -->
            <a :class="[currentNum === 1 ? 'ex-pagination-active' : '']"
            class="ex-pagination-btn" @click="currentNum === 1 ? '' :currentChange(currentNum-1)">
                <img class="iconfont-next-more-left" src="../assets/image/next.png" v-show='currentNum > 1'>
                <img  src="../assets/image/icon_pgup_grey.png" v-show='currentNum === 1'>
            </a>
            <a v-for="page in paginationBtn" :key="page.pageCount" :class="[page === currentNum ? 'ex-pagination-actives' : '']"
            class="ex-pagination-btn" @click="currentChange(page)" v-text="page">
            </a>

            <a :class="[currentNum === totalPages || totalPages === 0 ? 'ex-pagination-active' : '']"
            class="ex-pagination-btn" @click="currentNum === totalPages || totalPages === 0 ? '':currentChange(currentNum+1)">
                <img src="../assets/image/icon_pgdn_grey.png" v-if='currentNum === totalPages || totalPages === 0'>   
                <img src='../assets/image/next.png' v-else>             
            </a>
            <!-- <a :class="[currentNum === totalPages || totalPages === 0 ? 'ex-pagination-active' : '']"
            class="ex-pagination-btn" @click="currentChange(totalPages)">
                <img src="../assets/image/next-more.png">
            </a> -->
        </span>
    </div>
</template>
<script>
/**  分页条组件所需数据
 * pageCurrent 当前页
 * pageSize 显示多少条数据
 * pageCount 分页按钮数
 * totalCount 数据总条数
 * */
export default {
  name: "pagination",
  props: {
    pasgSiZeArray:{
      type:Array,
      default:()=>{
          return [5,10,20,30,40,100]
      }
    },
    layout: {
      type: String,
      default: "total,page,size,jumper,prev,next"
    },
    pageCurrent: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageCount: {
      type: Number,
      default: 10
    },
    totalCount: {
      required: true,
      default: 0,
      coerce: function(val) {
        if (!val) {
          return 0;
        } else {
          return val;
        }
      }
    }
  },
  watch:{
    pageCurrent(val){
      if(val){
        this.currentNumber = this.currentNum = val;
      }
    }
  },
  data: function() {
    return {
      pageSizeShow:false,
      currentNum: 0,
      currentNumber: 0,
      sizeNum: 0,
      sizeNumber: 0
    };
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.totalCount / this.sizeNum);
    },
    paginationBtn: function() {
      let arr = [];
      if (this.totalPages <= this.pageCount) {
        if (this.totalCount === 0) {
          arr = [1];
        } else {
          for (let i = 0; i < this.totalPages; i++) {
            arr[i] = i + 1;
          }
        }
      } else {
        if (
          this.currentNum <=
          this.pageCount - Math.floor(this.pageCount / 2)
        ) {
          for (let i = 0; i < this.pageCount; i++) {
            arr[i] = i + 1;
          }
        } else {
          if (
            this.currentNum >
            this.totalPages - Math.ceil(this.pageCount / 2)
          ) {
            for (let i = 0; i < this.pageCount; i++) {
              arr[i] = this.totalPages - this.pageCount + 1 + i;
            }
          } else {
            for (let i = 0; i < this.pageCount; i++) {
              arr[i] = this.currentNum - Math.floor(this.pageCount / 2) + i;
            }
          }
        }
      }
      return arr;
    }
  },
  mounted: function() {
    this.currentNumber = this.currentNum = this.pageCurrent;
    this.sizeNumber = this.sizeNum = this.pageSize;
  },
  methods: {
    // 点击跳转到 X 页
    currentChange: function(current) {
      current < 1 ? (current = 1) : "";
      current > this.totalPages ? (current = this.totalPages) : "";
      if (this.currentNum === current) {
      } else {
        this.currentNumber = this.currentNum = current;
      }
      this.$emit("current-change", this.currentNum);
    },
    // 跳转到 X 页
    currentChanges: function() {
      if (isNaN(this.currentNumber)) {
        this.currentNumber = this.currentNum;
      } else {
        this.currentNumber < 1 ? (this.currentNumber = 1) : "";
        this.currentNumber > this.totalPages
          ? (this.currentNumber = this.totalPages)
          : "";
        if (this.currentNumber === this.currentNum) {
        } else {
          this.currentNum = parseInt(this.currentNumber);
        }
      }
      this.$emit("current-change", this.currentNum);
    },
    // 每页显示 X 条
    sizeChanges: function(size) {
      this.pageSizeShow = false;
      if(this.sizeNum == size)return;
      this.sizeNum = size
      this.$emit("size-change", size,this.totalPages);
    }
  }
};
</script>