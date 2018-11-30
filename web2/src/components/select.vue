<style scoped>
    .select-box{
        position: relative;
        width: 300px; 
        margin-top:4px;
    }
    input,.select-content{
        width:100%;
    }
    input{
        height: 30px;
        padding: 7px 16px 7px 10px;
        line-height: 18px;
        border-radius: 0;
        height: 100%;
        font-size: 13px;
        color: #444;
        cursor: pointer;
    }
    .input{
        border: 1px solid #d4dff3;
    }
    .input-focus{
        border: 1px solid #1178c6;
        border-bottom: 1px solid transparent;
    }
    .icon-arrow{
        display: block;
        position: absolute;
        top: 50%;
        right: 15px;
        width: 10px;
        height: 5px;

        background: url(../assets/image/select_down.png) center no-repeat;
    }
    .select-content{
        position: absolute;
        border: 1px solid #d4dff3;
        z-index: 22;
        background: #fff;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 4px 5px rgba(0,0,0,0.15);
        padding: 4px;
        top: 32px;
    }
    .select-content ul{
        width: 100%;
    }
    .select-content li{
        padding: 0px 8px;
        height: 32px;
        box-sizing: border-box;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select-content li:hover{
        /* background-color: #1178c6; */
        /*border-color: #288fff;*/
        color: #fff;
        cursor: pointer;
        /* background-color: #e4e4e4; */
        background-color: #3875d7;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(20%, #3875d7), color-stop(90%, #2a62bc));
        background-image: -webkit-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: -moz-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: -o-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: linear-gradient(#3875d7 20%, #2a62bc 90%);
    }
    .blue-border .select-content{
        border-color:#4370bd;
    }
    /*input:focus{
        outline: -webkit-focus-ring-color auto 5px;
    }*/
       
 /*   .blue-border input{
        border-bottom-color:#00000017;
        border: 1px solid rgba(0,0,0,0.09);
    }*/
    .blue-border .icon-arrow{
        background: url(../assets/image/select_up.png) center no-repeat;
    }
    .selectedBlue{
        color: #fff;
        background-color: #3875d7;
        background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(20%, #3875d7), color-stop(90%, #2a62bc));
        background-image: -webkit-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: -moz-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: -o-linear-gradient(#3875d7 20%, #2a62bc 90%);
        background-image: linear-gradient(#3875d7 20%, #2a62bc 90%);
    }
    .overScroll{
        overflow-y: scroll;
        max-height: 340px;
    }
</style>
<template>
    <div class="select-box" :class="{'blue-border':showItems}">
        <input type="text" :class="showItems?'input-focus':'input'" readonly v-model="chooseName"  @click="open">
        <i class="icon-arrow"></i>
        <div class="select-content" v-if="showItems" :class="{'overScroll':items.length>10}">
            <ul>
                <li @click="chooseOne(item)" v-for="(item,index) in items" :class="{active: activeName == item.name,selectedBlue:chooseName==item.name}" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        props:{
            //下拉框选项
            items:{
                type:Array
            },
            //下拉框初始默认值
            defaultName:{
                type:String,
                default:'test'
            }
        },
        data() {
            return{
                showItems:false,
                chooseName:'',
                activeName:'',
            }
        },
        watch:{
        },
        methods: {
            chooseOne(item){
                this.chooseName = item.name;
                this.showItems = false;
                this.activeName = item.name;
                this.$emit('chooseName',this.chooseName);
            },
            open(){
                this.showItems = !this.showItems;
            }
        },
        mounted(){
            document.addEventListener('click', (e) => { if (!this.$el.contains(e.target)) this.showItems = false });
            this.chooseName = this.defaultName;

        }
    }

</script>
