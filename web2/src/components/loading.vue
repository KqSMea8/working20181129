<style lang="stylus" scoped>
.oa-ajax-loading {
    padding: 24px 0 6px;
    color: #000;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    width: 298px;
    height: 28px;
    background: url('../assets/image/ajax_loading.gif') no-repeat center 14px;
}

.blockOverlay {
    z-index: 1000;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgb(0, 0, 0);
    opacity: 0.2;
    cursor: wait;
    position: fixed;
}

.blockPage {
    z-index: 20000;
    position: fixed;
    padding: 0px;
    margin: -30px 0px 0px -150px;
    width: 300px;
    top: 50%;
    left: 50%;
    text-align: center;
    color: rgb(0, 0, 0);
    border: none;
    background: white;
    cursor: wait;
    height: 60px;
}
</style>

<template>
    <div>
        <div class="blockOverlay"></div>
        <div class="blockMsg blockPage">
          <div class="oa-ajax-loading">数据加载中，请稍候...</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loadFont: "加载中…"
    };
  },
  computed: {
    _loading() {
      // return this.$dialog._loading;
    }
  },
  mounted: function() {}
};
</script>