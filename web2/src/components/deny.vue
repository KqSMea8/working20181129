<template>
    <div id="hrc-deny" class="hrc-commonPage">
        <div class="hrc-commonPageIcon-noright"></div>
        <div id="hrc-denyMain" class="hrc-commonPageMain">
            <span>很抱歉，出错了</span>
            <p class="hrc-commonPageSubTitle">您暂时没有访问该页面的权限，努力吃菜，快高长大~</p>
            <p class="hrc-commonPageOperation">您现在可以：<a href="javascript:void(0);"
                                                        onclick="javascript:history.go(-1);">返回上一页</a> 或者 <a
                    id="denyHome" href="http://hrc.oa.com">返回主页</a></p></div>
        <div class="hrc-clearBoth"></div>
        <div id="errorInfo" class="errorInfo"></div>
        <div class="hrc-commonPageOthers">
            <span>去看看其它地方~</span>
            <ul class="hrc-infoGuide">
                <li><a href="http://holiday.oa.com/holiday/Evaluate/HDEvaluateMain.aspx">
                    <i class="hrc-entrance-q7"></i><span>我要休假</span></a></li>
                <li><a href="http://holiday.oa.com/v2"><i class="hrc-entrance-q7"></i><span>我的剩余假期</span> </a></li>
                <li><a href="http://zhaopin.oa.com/resume/pages/recommend/RecommendNewResume.aspx"><i
                        class="hrc-entrance-q5"></i><span>伯乐推荐</span> </a></li>
                <li>
                    <a href="https://pay.oa.com/sbc/default.aspx">
                        <i class="hrc-entrance-q8"></i>
                        <span>月薪查询</span>
                    </a>
                </li>
                <li><a href="http://zhaopin.oa.com/zhaopin/Facade/InnerMarketPostList.aspx"><i
                        class="hrc-entrance-q6"></i><span>内部人才市场</span> </a></li>
            </ul>
            <div class="hrc-clearBoth"></div>
        </div>
    </div>
</template>
<script>
    export default{
        data: function () {
            return {}
        },
        ready: function () {
        }
    }
</script>