<style lang="stylus" scoped>
.power-filter-dropdown {
    display: inline-block;
    position: relative;
    z-index: 10;
}

.power-filter-dropdown .filter-dorpdown-icon {
    display: inline-block;
    width: 24px;
    height: 16px;
    margin-left: -3px;
    vertical-align: middle;
    background: url('../assets/image/filter-normal.png') no-repeat;
    background-position: top center;
}

.power-filter-dropdown .filter-dorpdown-icon:hover {
    background: url('../assets/image/filter-selected.png') no-repeat;
    background-position: top center;
    cursor: pointer;
}

.power-filter-dropdown ul {
    position: absolute;
    top: 20px;
    width: 120px;
    border: 1px solid #e4e4e4;

    &.right {
        right: -38px;
    }
}

.power-filter-dropdown li {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #ffffff;
    padding-left: 10px;
}

.power-filter-dropdown li:hover {
    background: #eeeeee;
    cursor: pointer;
}

.power-filter-dropdown li .checkbox-wraper {
    line-height: 0;
    float: left;
    position: relative;
    top: 7px;
}

.power-filter-dropdown li .filter-name-wraper {
    float: left;
    padding-left: 5px;
    font-weight: bold;
}

.power-filter-dropdown .fn-hide {
    display: none;
}

.power-filter-dropdown .fn-block-show {
    display: block;
}

.power-checkbox {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
}

.power-checkbox input[type='checkbox'] {
    display: none;
}

.power-checkbox input[type='checkbox'] + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #ffffff url('../assets/image/normal.png') no-repeat;
    background-position: center;
}

.power-checkbox input[type='checkbox'] + label:hover {
    cursor: pointer;
    background: #ffffff url('../assets/image/normal-hover.png') no-repeat;
    background-position: center;
}

.power-checkbox input[type='checkbox']:disabled + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #ffffff url('../assets/image/normal-disabled.png') no-repeat;
    background-position: center;
}

.power-checkbox input[type='checkbox']:disabled + label:hover {
    cursor: not-allowed;
}

.power-checkbox input[type='checkbox']:checked + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #ffffff url('../assets/image/checked.png') no-repeat;
    background-position: center;
}

.power-checkbox input[type='checkbox']:checked + label:hover {
    cursor: pointer;
}

.power-checkbox input[type='checkbox']:checked:disabled + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #ffffff url('../assets/image/checked-disabled.png') no-repeat;
    background-position: center;
}

.power-checkbox input[type='checkbox']:checked:disabled + label:hover {
    cursor: not-allowed;
}
.check-input{
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #b9abab;
    background-color :#fff;
}
.check-input:hover{
    border:1px solid #088cf7;
    background-color :#fff;
}
.checkedInput{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../assets/image/checked.png') no-repeat;
    border:none;
    background-position: center;
}
</style>

<template>
    <span class="power-filter-dropdown">
        <span class="filter-dorpdown-icon" @click="open(types)"></span>
        <ul v-if="curType == types && isType" :class="right? 'right':''">
            <li v-for="(item, index) in list" :key="index" @click="setVal(item)" >
                <span class="checkbox-wraper power-checkbox">
                    <!-- <input type="checkbox" :id="'c'+index" v-model="item.is_cluster"  class="input-checkbox" value="on"> -->
                    <i class="check-input" v-show="!item.is_cluster"></i>
                    <i class="checkedInput" v-show="item.is_cluster"></i>
                    <label :for="'c'+index" class="label-checkbox"></label>
                </span>
                <span class="filter-name-wraper">{{item.name}}</span>
            </li>
        </ul>
    </span>
</template>

<script>
export default {
  name: "query",
  props: {
    // 类型| 所属集群:1、可用区：2、资源状态：3
    types: {
      type: Number,
      default: -1
    },
    // 列表数据
    list: {
      type: Array,
      default: []
    },
    // 是否为最后一列
    right: false
  },
  data() {
    return {
      // 当前点击的下拉类型
      curType: 0,
      // 是否点击
      isType: false,
      //   当前选择的值
      curVal: []
    };
  },
  mounted: function() {
    // 点击其他区域，收起下拉列表
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.isType = false;
      }
    });
  },
  methods: {
    // 点击展开
    open() {
      this.curType = this.types;
      this.isType = !this.isType;
    },
    // 点击下拉框行
    setVal(item) {
    //   let list = this.list;
        item.is_cluster = !item.is_cluster;
        let obj = {
            type: this.types,
            item: [],
            id: "",
            name: ""
        };
        this.list.map(function(item) {
            if (item.is_cluster) {
                obj.id === '' ? obj.id = item.id : obj.id = obj.id + ',' + item.id;
                obj.name === '' ? obj.name = item.name : obj.name = obj.name + ',' + item.name;
                obj.item.push(item);
            }
        })
    //   if (!item.is_cluster) {
    //     this.curVal.push(item);
    //   } else {
    //     for (var i = 0; i < this.curVal.length; i++) {
    //       if (this.curVal[i].id == item.id) {
    //         this.curVal.splice(i);
    //       }
    //     }
    //   }
    //   let obj = {
    //     type: this.types,
    //     item: this.curVal,
    //     id: "",
    //     name: ""
    //   };
    //   for (var i = 0; i < this.curVal.length; i++) { 
    //     obj.id += this.curVal[i].id + ",";
    //     obj.name += this.curVal[i].name + ",";
    //   }
      this.$emit("current", obj);
      this.isType = false;
    }
  }
};
</script> 
