<style lang="stylus" scoped>
.tips 
    display block;
    margin-top 5px;
    > p 
        display inline-block;
        padding: 2px 4px;
        font-size: 12px;
        line-height: 16px;
        color: #999;
    

    &.default 
        > p 
            &:before 
              display: inline-block;
              content: '提示：';
            
        
    
    &.error 
        > p 
            border: 1px solid #f79d9f;
            color: #ec3537;
            background-color: #f7eaea;
        
    
</style>

<template>
<div v-if="!isValid && isOperated && errorMessage.length>0" class="tips error">
    <p v-text="errorMessage"></p>
</div>
</template>

<script>
export default {
    components: {
    },
    props: {
        // 是否验证成功
        isValid: {
            required: true,
            type: Boolean,
            default: true,
            twoWay: true
        },
        // 验证规则
        validation: {
            type: Object
        },
        // 组件的最终输出项，类型不确定，validate() 里只通过长度来判断
        selectedItems: {
            required: true
        },
        // 是否操作过，要这样传入主要是因为组件的 input 边框变红等状态，errortip 组件内不好控制
        isOperated: {
            required: true,
            type: Boolean,
            twoWay: true
        }
    },
    vuex: {
    },
    data: function () {
        return {
            // 错误信息
            errorMessage: '',
            // 是否操作过
            // isOperated: false
        }
    },
    watch: {
    },
    computed: {
    },
    filters: {
    },
    methods: {
        // 验证
        validate: function() {
            this.isOperated = true
            if (this.validation) {
                if (this.validation.required) {
                    try{
                        if (!this.selectedItems || this.selectedItems.length == 0) {
                            this.errorMessage = '必填项'
                            this.isValid = false
                        } else {
                            this.errorMessage = ''
                            this.isValid = true
                        }
                    }catch(error){}
                }
            }
        }
    },
    events: {
        'validate': function() {
            this.validate()
            return true
        }
    },
    ready: function () {
    }
}
</script>