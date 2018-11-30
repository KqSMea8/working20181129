<style lang="stylus" scoped>
table            
  background-color #fff
  border #e3e3e3
  width 100%
  font-size 14px
  td
      box-sizing: border-box
      height: 44px
      border: 1px solid #e4e4e4
      border-top: none
      border-left: none
      text-align center
      &:nth-child(1)
        border-left: 1px solid #e4e4e4
        text-align: center
      button
        border none
        color #39f
        background-color #fff
        cursor: pointer
        outline none
      
  .col_1_title
      text-align  left
      
  .t-header
      background-color #f5f5f5
      color: #333
      th
          box-sizing: border-box
          height: 44px
          border: 1px solid #e4e4e4
          text-align: center
          background: #f5f5f5
          font-size: 14px
          font-weight: bold
          
  tr .col_1
      img
          width 24px
          height: 24px
          vertical-align: middle
          margin-right: 15px
</style>
<template>
  <div>
    <div class="version-body">
      <table border= "0 " cellpadding= "10" cellspacing= "0 ">
        <tr class="t-header">
          <th class="col_1_title">名称</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        <tbody>
          <template v-for='version in verList'>
            <tr>
              <td class="col_1">
                <img src="/src/assets/image/wind.png">
                <span>{{version.name}}</span>
              </td>
              <td>{{version.time}}</td>
              <td><button @click='createApply(version.name)'>创建应用</button></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "version",
  props:{
    mirrorName:{
      type:String
    }
  },
  data:function(){
    return{
      verList:[
        {
          name:'nginx',
          time:'2017-01-01'
        },
        {
          name:'nginx',
          time:'2017-01-01'
        }
      ]
    }
    
  },
  methods:{
    createApply (name) {
      console.log(name)
        this.$router.push({name:'createApplication',query:{ mirrorname: this.mirrorName, mirrorversion: name,type:false }})
    },
  }
}
</script>