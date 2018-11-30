<style lang="stylus" scoped>
  .none 
    display none
    input
      padding-left 10px
      font-size 14px
      height 30px
      line-height 30px
      background none 
      border none
      outline none
      color #30bc64
      caret-color #30bc64
      width 50%
  .box
    color #30bc64
    font-size 14px
    .connect
      padding:20px 0
    .display
      .request
        span 
          padding-left 10px
        .enter
          height 30px
          line-height 30px
</style>
<template>
  <div class='box'>
    <div class="connect">Connecting to : {{config.ip}}</div>
    <div class='display' v-for='item in display'>
      <div v-if='item.isShow'>
        <div class='request'>{{config.user+'@'+config.path}}: /$:<span>{{item.enter}}</span></div>
        <div class='result'>{{item.result}}</div>
      </div>
      <div class="enter" v-else>
        <span>{{config.user+'@'+config.path}}: /$:</span>
        <input type='text' :autofocus='!item.isShow' v-model="item.enter"  @keypress='send'/>
      </div>
    </div>
    
  </div>
</template>
<script>
export default{
  name:'control',
  data:function(){
    return {
      config:{
        ip:'10.235.7.183',
        user:'root',
        path:'tbds10-01-01'
      },
      display:[
        {
          isShow:false,
        }
      ],
    }
  },
  methods:{
    send:function(event){ 
      //回车发送请求
      if(event.keyCode == 13){
        this.display[this.display.length-1].isShow = true
        setTimeout(this.revert,1000)
      }
      
    },
    revert:function(){
      this.display[this.display.length-1].result = 'this is test'
      this.display.push({isShow:false})
    }
  },
  // watch:{
  //   display:{  
  //       handler:function(val,oldval){  
  //           console.log(val.name)  
  //       },  
  //       deep:true//对象内部的属性监听，也叫深度监听  
  //   }, 
  // }
}
</script>