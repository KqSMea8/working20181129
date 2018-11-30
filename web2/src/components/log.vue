<style lang="stylus" scoped>
  .box
    padding 30px 20px 20px  
    box-sizing border-box
    ul
      font-size 14px
      color #30bc64
      li
        height 24px
        line-height 24px
    .download
      margin-top 20px
      border:1px solid #008adc
      border-radius 5px
      width 100px
      height 28px
      font-size 16px
      line-height 26px
      text-align center
      color #008adc
      cursor pointer
</style>
<template>
  <div class='box'>
    <ul>
      <li v-for="log in logs">{{log}}</li>
    </ul>
    <div class="download" @click='download'>下载日志</div>
  </div>
</template>
<script>
export default{
  name:'log',
  data:function(){
    return{
      logs:[
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo ",
        "2018-05-05 this is a demo "
      ]
    }
  },
  methods:{
    download(){
      console.log("下载")
    }
  }
}
</script>