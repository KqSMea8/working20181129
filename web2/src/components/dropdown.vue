// 下拉框
<style lang="stylus" scoped>
.select_wrap_s {
  height: 32px;
  border: 1px #e5ebf4 solid;
  border-radius: 2px;
  line-height: 32px;
  position: relative;
  width: 340px;
}

.chosen-container {
  width: 100%;
  height: 100%;
  display: inline-block;
  // position: absolute;
  // left: 0;
  // top: 0;
}

.chosen-container .chosen-single {
  position: relative;
  display: block;
  overflow: hidden;
  color: #444;
  text-decoration: none;
  white-space: nowrap;
  padding: 6px 16px 6px 8px;
  border: 1px solid transparent;
  line-height: 18px;
  background: none;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  height: 100%;
  outline: none;
  cursor: pointer;
}

.chosen-container-single .chosen-single span {
  display: block;
  overflow: hidden;
  margin-right: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chosen-container * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.chosen-container .chosen-single div {
  top: 50%;
  right: 15px;
  margin-top: -3px;
  width: 10px;
  height: 5px;
  position: absolute;
  display: block;
}

.chosen-container .chosen-single div b {
  display: block;
  width: 100%;
  height: 100%;
  background: url('../assets/image/select_down.png') center no-repeat;
}

.chosen-container .chosen-drop {
  border: 1px solid #4370bd;
  border-top: 0;
  margin-top: 1px;
  border-radius: 0 0 4px 4px;
  background-clip: padding-box;
  position: absolute;
  top: 32px;
  left: 0;
  z-index: 99999;
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
}

.chosen-container.chosen-with-drop .chosen-single div b {
  margin-top: -1px;
  background: url('../assets/image/select_up.png') center no-repeat;
}

.chosen-search {
  position: absolute;
  left: -9999px;
  z-index: 1010;
  margin: 0;
  padding: 3px 4px;
  white-space: nowrap;
}

.chosen-search input[type=text] {
  margin: 1px 0;
  padding: 4px 20px 4px 5px;
  width: 100%;
  height: auto;
  outline: 0;
  border: 1px solid #DDD;
  background: url('../assets/image/chosen-sprite.png') 100% -20px no-repeat;
  font-size: 1em;
  font-family: sans-serif;
  line-height: normal;
  border-radius: 0;
}

.chosen-results {
  color: #444;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding: 0;
  max-height: 130px;
}

.chosen-results li {
  margin: 0;
  padding: 0 6px;
  list-style: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}

.chosen-results li.highlighted {
  background-color: #3875d7;
  color: #ffffff;
}

.chosen-results li.active-result {
  display: list-item;
  cursor: pointer;

  &:hover {
    background-color: #3875d7;
    color: #ffffff;
  }
}
</style>
<template>
    <div class="select_wrap select_wrap_s" :style="'width:'+width+'px'">
      <div id="select-gear1" class="select_two">
        <div class="chosen-container chosen-container-single chosen-container-single-nosearch" :class="listShow?'chosen-with-drop':''">
          <a class="chosen-single" tabindex="-1" @click="open">
            <span>{{selected}}</span>
            <div><b></b></div>
          </a>
          <div class="chosen-drop" v-if="listShow">
            <div class="chosen-search" style="display:none;">
              <input type="text" autocomplete="off" readonly="">
            </div>
            <ul class="chosen-results" v-if="list">
              <li 
              v-for="(item,index) in list" 
              :key="index" 
              class="active-result"
              :class="selected == item.name ? 'result-selected highlighted':''"
              @click="setName(item)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "dropdown",
  data() {
    return {
      // 是否显示下拉框列表
      listShow: false,
      list: [],
      selected: ""
    };
  },
  props: {
    // // 列表数据
    // list: {
    //   type: Array,
    //   default: []
    // },
    // // 当前选中值
    // selected: {
    //   type: String,
    //   default: ""
    // }
    // 输入框宽度
    width: {
      type: Number,
      default: 300
    }
  },
  methods: {
    // 打开下拉列表
    open() {
      this.listShow = !this.listShow;
    },
    // 选中名称
    setName(item) {
      this.selected = item.name;
      this.listShow = false;
    }
  },
  mounted: function() {
    // 点击其他区域，收起下拉列表
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.listShow = false;
      }
    });
    this.selected = "1111";
    this.list = [
      {
        id: 1,
        name: "1111"
      },
      {
        id: 2,
        name: "2222"
      },
      {
        id: 3,
        name: "3333"
      }
    ];
  }
};
</script>
