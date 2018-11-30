<style scoped>
    input[type="range"] {
        width:100%;
        /* margin-left: -15px; */
        background-color:transparent;/*原生的底线透明了*/
        border-radius:5px;
        -webkit-appearance:none;
        height:8px;
        z-index: 3;
        position:relative;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
    }
    input[type=range]:focus{
        outline: none;
    } 
        
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 30px;
        width: 15px;
        outline: none;
        margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
        background: #E5F1FF; 
        border-radius: 3px; /*外观设置为圆形*/
        border: solid 1px #57A7FF; /*设置边框*/
        position:relative;
        top:-4px;
        z-index:7;
        left:0px;
    }
    .com_cell_range_line_bottom {
        width:100%;
        border-radius: 3px;
        height:8px;
        background:#f6f6f6;
        position:absolute;
        top:0;
        z-index: 1;
    }
    .com_cell_range_line {
        height: 8px;
        border-radius: 3px 0 0 3px;
        background: #E5F1FF; 
        position:absolute;
        top:0px;
        z-index: 2;
    }
    .box{
        position: relative;
    }
    .line-height{
        margin-top: 30px;
        width: 300px;
    }
    .slider-range{
      width:100%;
      display: flex;
      margin-top:18px;
      margin-left: 8px;
    }
    .slider-range span:nth-child(1){
        flex:1;
    }
    .slider-range span:nth-child(2){
        flex:1;
    }
    .slider-range span:before{
      content: "";
      border-left: 1px solid #666666bd;
      position: relative;
      width: 0.1px;
      height: 16px;
      display: inline-block;
      top: -20px;
      left: 16px;
    }
    .slider-range .max-line:before{
      left: 30px;
    }
    .slider-range .min-line:before{
      left: 7px;
    }
    .slider-range .min-line{
      margin-left: -8px;
    }

    .box{
      width:100%;
    }
    .number_content{
      max-width: 123px;
      display: inline-block;
      height: 32px;
      border: 1px #d4dff3 solid;
      vertical-align: middle;
      position: absolute;
      top: -10px;
      right: -42%;
    }
    .number_content a{
      cursor: pointer;
      text-decoration: none;
      color: #1278c6;
    }
    .number_content a:-webkit-any-link {
        color: -webkit-link;
        cursor: pointer;
        text-decoration: underline;
    }
    .btn_minus{
      float: left;
      width: 28px;
      height: 32px;
      background: url('../assets/image/icon_minus_normal.png') no-repeat center center;
    }

    .btn_plus{
      float: right;
      width: 28px;
      height: 32px;
      background: url('../assets/image/icon_plus_normal.png') no-repeat center center;
    }
    .number_content input{
      float: left;
      width: 64px;
      height: 16px!important;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      color: #556677;
      margin-top: 8px!important;
      border: 0;
      border-left: 1px #b4cae2 solid;
      border-right: 1px #b4cae2 solid;
      outline: 0;
      font-family: "Helvtical", "microsoft yahei", sans-serif;
    }
    .range_title{
        position: absolute;
        top: -28px;
        right: 0;
        font-size: 8px;
        color: #f46a6a;
    }

</style>
<template>
    <div>
        <div class="box">
            <input type="range"  v-model='fontSize' step="1" min="1" :max="validLine" @change="getRange" v-bind:style="{width: validLine + '%'}">
            <div class="com_cell_range_line_bottom"></div>
            <div class="com_cell_range_line" v-bind:style="{width: (fontSize/maxLine*100) + '%'}"></div>
            <i class="slider-thumb" v-bind:style="{left: (fontSize/maxLine*100) + '%'}"></i>
            <div class="slider-range">
              <span class="min-line">1GB</span>
              <span>{{maxLine/2}}GB</span>
              <span class="max-line">{{maxLine}}GB</span>
            </div>
            <div class="number_content cl vm">
              <a href="javascript:;" class="btn_minus" @click="editAppExamples('-')"></a>
              <input class="text_num" type="text" readonly :value="fontSize+'GB'">
              <a href="javascript:;" class="btn_plus" @click="editAppExamples('+')"></a>
            </div>
            <div v-if="validLine != 0" class="range_title">最大可用容量为{{validLine}}GB</div>
            <div v-else class="range_title">无可用容量，请重新调整配置</div>
        </div>
        
    </div>
</template>
<script>
    export default {
        components: {
        },
        data() {
            return { 
                fontSize:1,//进度条初始值
            }
        },
        watch:{
            initSize(val,oldval){
                if(val!=oldval){
                    // console.log(val)
                }
            },
            rangeFlag(){
                this.fontSize = 1;
                this.fontSize = this.initSize;
            }
        },
        props:{
            maxLine:{
                type:Number//进度条最大值
            },
            validLine:{
                type:Number//进度条有效值
            },
            showPrompt:{
                type:Boolean,//权重设置提示语显示与否
                default:false
            },
            initSize:{
                type:[String,Number]//权重选择初始值
            },
            rangeFlag:{
                type:Boolean
            }
        },
        methods: {
            //获取进度条model值
            getRange(){
                this.$emit('range',this.fontSize);
            },
            editAppExamples(type){

                if(type=='-'&&this.fontSize>1){
                    if(this.fontSize == this.validLine && this.validLine != parseInt(this.validLine)){
                        this.fontSize = parseInt(this.validLine)
                    }else{
                        this.fontSize--;
                    }
                }
                if(type=='+' && this.fontSize < this.validLine){
                    this.fontSize++;
                    if(this.fontSize > this.validLine)this.fontSize = this.validLine
                }
                this.$emit('range',this.fontSize);
            },
            
        },
        mounted(){
            //权重有初始值
            if(this.showPrompt){
                this.fontSize = this.initSize;
                this.getRange();
            }else if(this.initSize!=undefined){
                //非权重状态有初始值
                this.fontSize = this.initSize;
                
            }
        }
    }

</script>
